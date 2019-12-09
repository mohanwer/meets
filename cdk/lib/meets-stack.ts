import cdk = require('@aws-cdk/core');
import iam = require ("@aws-cdk/aws-iam");
import lambda = require("@aws-cdk/aws-lambda");
import {Effect, PolicyStatement} from "@aws-cdk/aws-iam";

const stackProps: cdk.StackProps = {
  env: {
    region: 'us-east-2',
    account: '147730025470'
  },
  stackName: 'meets-stack'
};

export class MeetsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, stackProps);

    // Permissions take from:
    // https://aws.amazon.com/blogs/security/how-to-create-an-aws-iam-policy-to-grant-aws-lambda-access-to-an-amazon-dynamodb-table/

    const role = new iam.Role(this, 'role', {
      assumedBy: new iam. ServicePrincipal('lambda.amazonaws.com'),
      managedPolicies: [
        {managedPolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"},
        {managedPolicyArn: "arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole"},
        {managedPolicyArn: "arn:aws:iam::aws:policy/AmazonSSMReadOnlyAccess"},
      ],
    });

    role.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        "dynamodb:BatchGetItem",
        "dynamodb:GetItem",
        "dynamodb:Query",
        "dynamodb:Scan",
        "dynamodb:BatchWriteItem",
        "dynamodb:PutItem",
        "dynamodb:UpdateItem"
      ],
      resources: [`arn:aws:dynamodb:${stackProps.env?.region}:147730025470:table/Meets`]
    }));

    role.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["logs:CreateLogStream", "logs:PutLogEvents"],
      resources: [`arn:aws:logs:${stackProps.env?.region}:147730025470`]
    }));

    role.addToPolicy(new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ["logs:CreateLogGroup"],
      resources: ["*"]
    }));

    new lambda.Function(this, 'lambda', {
      runtime: lambda.Runtime.PYTHON_3_8,
      functionName: 'Meets-Create',
      handler: 'database.create',
      code: lambda.Code.fromAsset('../source'),
      timeout: cdk.Duration.minutes(1),
      memorySize: 128,
      role: role
    })
  }
}