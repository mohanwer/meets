import {Stack} from '@aws-cdk/core'
import {
  AuthorizationType,
  CfnAuthorizer,
  ConnectionType,
  LambdaIntegration,
  Model,
  PassthroughBehavior,
  RestApi,
} from '@aws-cdk/aws-apigateway'
import {IFunction} from '@aws-cdk/aws-lambda'
import {createGetResponseEventModel, createRequestEventModel, createResponseGenericIdModel} from "./models"
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource"
import {integration200, integration400, method200, method400} from "./responses"

export const eventsPost = (
  scope: Stack,
  eventsCreate: IFunction,
  api: RestApi,
  resource: Resource,
  auth: CfnAuthorizer,
  genericIdResponseModel: Model
) => {
  const integration = new LambdaIntegration(eventsCreate, {
    proxy: false,
    allowTestInvoke: true,
    connectionType: ConnectionType.INTERNET,
    passthroughBehavior: PassthroughBehavior.NEVER,
    //Todo: find a more efficient way to map the body:
    requestTemplates: {
      'application/json':
        `#set($inputRoot = $input.path('$'))
        {
          "body": {
            "eventName": "$inputRoot.eventName",
            "shortDescription": "$inputRoot.shortDescription",
            "longDescription": "$inputRoot.longDescription",
            "address1": "$inputRoot.address1",
            #if($inputRoot.address2 != "")
                "address2": "$inputRoot.address2",
            #else
                "address2": null,
            #end
            "city": "$inputRoot.city",
            "state": "$inputRoot.state",
            "postal": "$inputRoot.postal",
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

  resource.addMethod('POST', integration, {
    requestModels: {'application/json': requestModel},
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {authorizerId: auth.ref},
    requestParameters: {'method.request.header.Authorization': true},
    requestValidator: api.addRequestValidator('default', {
      validateRequestBody: true,
      validateRequestParameters: true
    }),
    methodResponses: [method200(genericIdResponseModel), method400]
  })
}

export const eventsGet = (scope: Stack, eventsGet: IFunction, api: RestApi, resource: Resource) => {
  const integrationn = new LambdaIntegration(eventsGet, {
    proxy: false,
    allowTestInvoke: true,
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestParameters: {
      'integration.request.querystring.id': 'method.request.querystring.id'
    },
    requestTemplates: {
      'application/json': JSON.stringify({id: "$util.escapeJavaScript($input.params('id'))"})
    },
    integrationResponses: [integration200, integration400],
  })

  const responseModel = createGetResponseEventModel(api)

  resource.addMethod('GET', integrationn, {
    requestValidator: api.addRequestValidator('def-get', {
      validateRequestParameters: true,
      validateRequestBody: false
    }),
    requestParameters: {
      'method.request.querystring.id': true
    },
    methodResponses: [method200(responseModel), method400]
  })
}