import {Stack} from '@aws-cdk/core'
import {
  AuthorizationType, CfnAuthorizer,
  ConnectionType,
  LambdaIntegration,
  PassthroughBehavior,
  RestApi,
} from '@aws-cdk/aws-apigateway'
import {IFunction} from '@aws-cdk/aws-lambda'
import {createRequestEventModel, createResponseEventModel} from "./models"
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource"
import {integration200, integration400, method200, method400} from "./responses"

export const createEventResource = (scope: Stack, api: RestApi): Resource => {
  return api.root.addResource('events', {})
}

export const eventsPost = (scope: Stack, eventsCreate: IFunction, api: RestApi, resource: Resource, auth: CfnAuthorizer) => {
  const integration = new LambdaIntegration(eventsCreate, {
    proxy: false,
    allowTestInvoke: true,
    connectionType: ConnectionType.INTERNET,
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      'application/json':
        `#set($inputRoot = $input.path('$'))
        {
          "body": {
            "eventName": "$inputRoot.eventName",
            "shortDescription": "$inputRoot.shortDescription",
            "longDescription": "$inputRoot.longDescription",
            "geoLocation": {
              "lat": $inputRoot.geoLocation.lat,
              "lng": $inputRoot.geoLocation.lng
            },
            "userId": "$context.authorizer.claims['cognito:username']"
          }
        }`
    },
    integrationResponses: [integration200, integration400],
  })

  const requestModel = createRequestEventModel(api)
  const responseModel = createResponseEventModel(api)

  resource.addMethod('POST', integration, {
    requestModels: {'application/json': requestModel},
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {authorizerId: auth.ref},
    requestParameters: {'method.request.header.Authorization': true},
    requestValidator: api.addRequestValidator('default', {
      validateRequestBody: true,
      validateRequestParameters: true
    }),
    methodResponses: [method200(responseModel), method400]
  })
}