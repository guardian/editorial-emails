# Getting Started

## Set up

For the MVP, the core tecnologies are: React, Node, Typescript.

You can set up the project by running the below:

```bash
yarn install // install deps
yarn dev // run locally
yarn [test|tslint|tsc|..] // see package.json scripts for options here
```

## Deploying

We use continuous delivery so merging to master will automatically deploy.
Behind the scenes (i.e. in TC), we run:

```bash
yarn build
yarn upload-artifact
```

You can run the first locally to troubleshoot.

## Logs and troubleshooting

There is a healthcheck in Route53 connected to an alarm that should email the
team if the service is unavailable.

The lambda has logs in Cloudwatch Logs.

For additional troubleshooting, it is possible to setup access logs in API
Gateway. See: [AWS API gateway - set up logging](ttps://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-logging.html).

## Redeployment

### Project status (end of Q3 2019/2020)

This service is not currently running, although it was successfully used for
numerous A/B tests in Q3 2019/20, as the work was deprioritised at the end of
the quarter.

Documentation for the Q3 OKR, including test results, can be found here:

[Google Drive of Q3 2019/20 OKR material](https://drive.google.com/drive/folders/10042sGUYZDua2eyApkLPOS-qH1dLRQbQ)

But the project is still useful!

- Firstly, as a kind of documentation/example for how to do HTML in emails
- Secondly, as a launch point for any future email-related OKR

How to redeploy, etc.

1. re-enable the Teamcity project (dotcom:editorial-emails) VCS trigger
2. deploy to CODE or PROD

(If the Teamcity project has been deleted you'll need to recreate it.)

There are a few code changes that should be prioritised:

1. Make the fronts 'generic'

    To speed up testing, we hard-coded layouts for fronts. Also, because we wanted
    to test a variety of designs/layout options for the same fronts. Really though,
    these should be driven by the data model. There is metadata in the fronts model
    around which container to use. With this, it will become a lot easier to quickly
    add new fronts to the project.

2. Remove unsuccessful variants

    We have preserved even badly performing designs as a record of the work, but if
    you want to make this project 'real' again, you probably want to delete these.
    Our test results for CTO can be found here:

### Supported Emails & Variants

Variants named B/C/D were active by the end of the A/B testing phase.
Variants named X/Y/Z had been switched off by then.

- Film Today
  - Variant B
  - Variant Z

- Media Briefing
  - Variant B
  - Variant C
  - Variant Z

- Business Today
    Variant B

- Opinion
  - Variant B
  - Variant Y
  - Variant Z

- Sport AU
  - Variant B
  - Variant C
