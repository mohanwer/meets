import {Duration, Stack} from '@aws-cdk/core'
import  {Effect, IRole, PolicyStatement, Role, ServicePrincipal} from "@aws-cdk/aws-iam"
import {Code, Function, Runtime} from '@aws-cdk/aws-lambda'
import {stackProps} from "../meets-stack"

export const createLambdaRole = (stack: Stack): IRole => {
  const role = new Role(stack, 'role', {
      assumedBy: new ServicePrincipal('lambda.amazonaws.com'),
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

    return role
}

export const createLambda = (stack: Stack, role: IRole, functionName: string, handler: string): Function => {
  return new  Function(stack, `l-${functionName}`, {
    runtime: Runtime.PYTHON_3_8,
    functionName: functionName,
    handler: handler,
    code: Code.fromAsset('../aws_lambda/app'),
    timeout: Duration.minutes(1),
    memorySize: 128,
    role: role
  });
}