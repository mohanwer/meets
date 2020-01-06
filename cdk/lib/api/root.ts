import {Stack} from '@aws-cdk/core'
import {CfnAuthorizer, AuthorizationType, RestApi} from '@aws-cdk/aws-apigateway'
import {EndpointType} from "@aws-cdk/aws-apigateway/lib/restapi"

export const createApi = (scope: Stack): RestApi => {
  return new RestApi(scope, 'meets-api', {
    endpointTypes: [EndpointType.REGIONAL],
    restApiName: 'meets-api',
  })
}

export const createAuthorizer = (scope: Stack, api: RestApi): CfnAuthorizer => {
  return new CfnAuthorizer(scope, 'cognitoAuth', {
    restApiId: api.restApiId,
    type: AuthorizationType.COGNITO,
    identitySource: 'method.request.header.Authorization',
    name: 'Cognito',
    providerArns: ['arn:aws:cognito-idp:us-east-2:147730025470:userpool/us-east-2_wTghw5Kon']
  })
}