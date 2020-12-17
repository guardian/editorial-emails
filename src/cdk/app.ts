import cdk = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import iam = require("@aws-cdk/aws-iam");
import route53 = require("@aws-cdk/aws-route53");
import s3 = require("@aws-cdk/aws-s3");
import {Certificate} from "@aws-cdk/aws-certificatemanager";
import {CfnMapping, CfnOutput, CfnParameter, Fn} from "@aws-cdk/core";


export class EmailService extends cdk.Stack {

    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: "eu-west-1" } });

        const stage = new cdk.CfnParameter(this, "Stage", {
            type: "String",
            default: "CODE"
        });

        const handler = this.createHandler(stage);

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

        const apiDomainName = this.createDomainName(api, stage);

        // tslint:disable-next-line: no-unused-expression
        new route53.CfnHealthCheck(this, "editorial-emails-healthcheck", {
            healthCheckConfig: {
                type: "HTTPS",
                fullyQualifiedDomainName: apiDomainName.domainName,
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

    createHandler(stage: CfnParameter): lambda.Function {
        const frontsBucketARN = "arn:aws:s3:::aws-frontend-store/*";
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
                    `arn:aws:ssm:${this.region}:${this.account}:parameter/frontend/*`
                ],
                actions: ["ssm:GetParameter"]
            })
        );

        return handler;
    }

    createDomainName(api: apigateway.LambdaRestApi, stage: CfnParameter): apigateway.DomainName {
        const mappingKey = "mapping";
        const domainNameKey = "DomainName";
        const certificateIdKey = "CertificateId";

        // tslint:disable-next-line: no-unused-expression
        new CfnMapping(this, mappingKey, {
            [mappingKey]: {
                [domainNameKey]: {
                    CODE: "email-newsletters.code.dev-theguardian.com",
                    PROD: "email-newsletters.theguardian.com"
                },
                [certificateIdKey]: {
                    CODE: 'e9353a7b-d4b6-4069-b7f6-e6bccbfc69bb',
                    PROD: '6462b5b8-ee19-4397-8481-0fbd3151c7a3'
                }
            }
        });

        const domainName = Fn.findInMap(mappingKey, domainNameKey, stage.valueAsString);
        const certificateArn = `arn:aws:acm:us-east-1:${this.account}:certificate/${Fn.findInMap(mappingKey, certificateIdKey, stage.valueAsString)}`;

        const certificate = Certificate.fromCertificateArn(this, "editorial-emails-api-certificate",certificateArn);

        const apiDomainName = new apigateway.DomainName(this, "editorial-emails-api-domain-name", {
            domainName,
            certificate,
            endpointType: apigateway.EndpointType.EDGE,
        });

        apiDomainName.addBasePathMapping(api, { basePath: "" });

        return apiDomainName
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new EmailService(app, "EditorialEmails");
