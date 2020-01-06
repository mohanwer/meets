import {Stack} from '@aws-cdk/core'
import {
  AuthorizationType, CfnAuthorizer,
  ConnectionType,
  LambdaIntegration,
  PassthroughBehavior,
  RestApi,
  Model
} from '@aws-cdk/aws-apigateway'
import {IFunction} from '@aws-cdk/aws-lambda'
import {createRequestEventModel, createResponseEventModel} from "./models"
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource"

export const createEventResource = (scope: Stack, api: RestApi): Resource => {
  return api.root.addResource('events', {
    defaultCorsPreflightOptions: {
      allowOrigins: ['*'],
    }
  })
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
      integrationResponses: [
        {
          statusCode: '200',
          responseTemplates: {
                "application/json": "$input.json('$.body')"
          },
          selectionPattern: "^$"
        },
        {
          selectionPattern: '(\n|.)+',
          statusCode: "400",
          responseTemplates: {
              'application/json': JSON.stringify({
                state: 'error',
                message: "$util.escapeJavaScript($input.path('$.errorMessage'))"
              })
          },
        }
      ],
    })
  const requestModel = createRequestEventModel(api)
  const responseModel = createResponseEventModel(api)
  resource.addMethod('POST', integration, {
    requestModels: {
      'application/json': requestModel,
    },
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {authorizerId: auth.ref},
    requestParameters: {
      'method.request.header.Authorization': true,
    },
    methodResponses: [
      {
        statusCode: "200",
        responseModels: {
          "application/json": responseModel
        },
      },
      {
        statusCode: "400",
        responseModels: {
          "application/json": Model.ERROR_MODEL
        }
      }
    ]
  })
}