import cdk = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import iam = require("@aws-cdk/aws-iam");
import route53 = require("@aws-cdk/aws-route53");
import s3 = require("@aws-cdk/aws-s3");

export class EmailService extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string) {
        super(scope, id, { env: { region: "eu-west-1" } });

        const frontsBucketARN = "arn:aws:s3:::aws-frontend-store/*";
        const s3Role = new iam.Role(this, "Role", {
            assumedBy: new iam.ServicePrincipal("lambda.amazonaws.com")
        });

        s3Role.addToPolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [frontsBucketARN],
                actions: ["s3:GetObject"]
            })
        );

        s3Role.addToPolicy(
            new iam.PolicyStatement({
                effect: iam.Effect.ALLOW,
                resources: [
                    "arn:aws:ssm:eu-west-1:642631414762:parameter/frontend/*"
                ],
                actions: ["ssm:GetParameter"]
            })
        );

        const stage = new cdk.CfnParameter(this, "Stage", {
            type: "String",
            default: "CODE"
        });

        const bucket = "aws-frontend-editorial-emails";
        const key = `frontend/${stage.value}/lambda/lambda.zip`;

        const handler = new lambda.Function(this, "EditorialEmailsHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromBucket(
                s3.Bucket.fromBucketName(this, "lambda-code-bucket", bucket),
                key
            ),
            handler: "server.handler",
            role: s3Role,
            functionName: `frontend-editorial-emails-${stage.value}`
        });

        // tslint:disable-next-line: no-unused-expression
        new apigateway.LambdaRestApi(this, "editorial-emails-api", {
            restApiName: `editorial-emails-${stage.value}`,
            description: "Serves editorial email fronts.",
            proxy: true,
            handler
        });

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
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new EmailService(app, "EditorialEmails");
