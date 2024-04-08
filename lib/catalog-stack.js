const { Stack, Duration } = require('aws-cdk-lib');
const lambda = require('aws-cdk-lib/aws-lambda');
const iam = require('aws-cdk-lib/aws-iam');

class CatalogStack extends Stack {
  /**
   *
   * @param {Construct} scope
   * @param {string} id
   * @param {StackProps=} props
   */
  constructor(scope, id, props) {
    super(scope, id, props);

    const catalogListLamba = new lambda.Function(this, 'catalogListLamba', {
      runtime: lambda.Runtime.NODEJS_18_X,
      handler: 'index.handler',
      code: lambda.Code.fromAsset('lambda'),
      timeout: Duration.minutes(1),
      tracing: lambda.Tracing.ACTIVE,
    });

    catalogListLamba.addToRolePolicy(new iam.PolicyStatement({
      actions: ['s3:GetObject', 'logs:CreateLogGroup', 'logs:CreateLogStream', 'logs:PutLogEvents', ,
        "secretsmanager:GetSecretValue"],
      resources: ['*'],
    }));
  }
}

module.exports = { CatalogStack }
