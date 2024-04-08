# MS Catalog [![Node.js CI](https://github.com/linkticTest/ms-catalog/actions/workflows/lambda.yml/badge.svg)](https://github.com/linkticTest/ms-catalog/actions/workflows/lambda.yml)

This is the Catalog microservice built with Node.js

## Technologies

* `cdk`  
* `nodejs`  
* `docker` through CDK

## Development Pattern

* `Middleware pattern`  

## Development Requirements

- NodeJS 20.x
- Npm
- git

- For these commands, an AWS account needs to be configured beforehand using the `aws configure` command in the console.

- To run these lambdas locally, SAML is required. It handles creating the Docker container and running it directly: [SAM CLI Installation Guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html)

## How to install the lambda locally:

* `npm install`          Install CDK Dependencies
* `cd lambda`            Navigate to the lambda directory
* `npm install`          Install Lambda Dependencies
* `npx cdk synth`        Emits the synthesized CloudFormation 
* `npx cdk deploy`       Deploy this stack to AWS account

## How to run the lambda locally:

Once installed and the lambda is previously configured, you can execute the lambda.

`sam local invoke -t ./cdk.out/CatalogStack.template.json catalogListLamba  --profile personal` 

## CI / CD

For CI/CD flow, AWS CDK was used to build infrastructure from the CloudFormation template. The CDK file can be found at the following path:

`lib/catalog-stack.js` 

For CD flow, GitHub Actions were utilized. The pipelines are pre-configured in this repository targeting the master branch:

`.github/workflows/lambda.yml` 
