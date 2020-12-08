import cdk = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import iam = require("@aws-cdk/aws-iam");
import route53 = require("@aws-cdk/aws-route53");
import s3 = require("@aws-cdk/aws-s3");
import * as acm from "@aws-cdk/aws-certificatemanager";
import {CfnMapping, CfnOutput, CfnParameter, Fn} from "@aws-cdk/core";
import {DomainName} from "@aws-cdk/aws-apigateway";

export class EmailService extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: "eu-west-1" } });

        const frontsBucketARN = "arn:aws:s3:::aws-frontend-store/*";

        const stage = new cdk.CfnParameter(this, "Stage", {
            type: "String",
            default: "CODE"
        });

        const bucket = "aws-frontend-editorial-emails";
        const key = `frontend/${stage.value}/lambda/lambda.zip`;

        const handler = new lambda.Function(this, "EditorialEmailsHandler", {
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromBucket(
                s3.Bucket.fromBucketName(this, "lambda-code-bucket", bucket),
                key
            ),
            handler: "server.handler",
            functionName: `frontend-editorial-emails-${stage.value}`
        });

        handler.addToRolePolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [frontsBucketARN],
                actions: ["s3:GetObject"]
            })
        );

        handler.addToRolePolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [
                    "arn:aws:ssm:eu-west-1:642631414762:parameter/frontend/*"
                ],
                actions: ["ssm:GetParameter"]
            })
        );

        const api = new apigateway.LambdaRestApi(this, "editorial-emails-api", {
            restApiName: `editorial-emails-${stage.value}`,
            description: "Serves editorial email fronts.",
            proxy: true,
            handler,
            deployOptions: {
                loggingLevel: apigateway.MethodLoggingLevel.INFO,
                dataTraceEnabled: true
            }
        });

        const apiDomainName = this.createDomainName(stage);
        apiDomainName.addBasePathMapping(api, { basePath: "" });

        // tslint:disable-next-line: no-unused-expression
        new route53.CfnHealthCheck(this, "editorial-emails-healthcheck", {
            healthCheckConfig: {
                type: "HTTPS",
                fullyQualifiedDomainName: "email-newsletters.theguardian.com",
                resourcePath: "/healthcheck",
                port: 443,
                failureThreshold: 3
            }
        });

        // tslint:disable-next-line: no-unused-expression
        new CfnOutput(this, `editorial-emails-hostname`, {
            description: "hostname",
            value: `${apiDomainName.domainNameAliasDomainName}`,
        });
    }

    private createDomainName(stage: CfnParameter): DomainName {
        const mappingKey = "mapping";
        const domainNameKey = "DomainName";

        // tslint:disable-next-line: no-unused-expression
        new CfnMapping(this, mappingKey, {
            [mappingKey]: {
                [domainNameKey]: {
                    CODE: "email-newsletters.code.dev-theguardian.com",
                    PROD: "email-newsletters.theguardian.com"
                }
            }
        });

        const domainName = Fn.findInMap(mappingKey, domainNameKey, stage.valueAsString);

        const apiCertificate = new acm.Certificate(this, "editorial-emails-api-certificate", {
            domainName,
            validationMethod: acm.ValidationMethod.DNS
        });

        return new apigateway.DomainName(this, "editorial-emails-api-domain-name", {
            domainName,
            certificate: apiCertificate,
            endpointType: apigateway.EndpointType.EDGE,
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new EmailService(app, "EditorialEmails");
