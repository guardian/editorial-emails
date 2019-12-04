import cdk = require("@aws-cdk/core");
import apigateway = require("@aws-cdk/aws-apigateway");
import lambda = require("@aws-cdk/aws-lambda");
import iam = require("@aws-cdk/aws-iam");
import certmgr = require("@aws-cdk/aws-certificatemanager");

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

        const handler = new lambda.Function(this, "EditorialEmailsHandler", {
            runtime: lambda.Runtime.NODEJS_10_X,
            code: lambda.Code.fromAsset(
                __dirname + "../../../editorial-emails.zip"
            ),
            handler: "server.handler",
            role: s3Role
        });

        const emailDomain = "email-newsletters.theguardian.com";
        const cert = new certmgr.Certificate(this, "Certificate", {
            domainName: emailDomain,
            validationMethod: certmgr.ValidationMethod.DNS
        });

        // tslint:disable-next-line: no-unused-expression
        new apigateway.LambdaRestApi(this, "editorial-emails-api", {
            restApiName: "Editorial Emails Service",
            description: "Serves editorial email fronts.",
            proxy: true,
            domainName: {
                certificate: cert,
                domainName: emailDomain,
                endpointType: apigateway.EndpointType.EDGE
            },
            handler
        });
    }
}

const app = new cdk.App();
// tslint:disable-next-line: no-unused-expression
new EmailService(app, "EditorialEmails");
