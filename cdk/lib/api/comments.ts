import {
  AuthorizationType,
  CfnAuthorizer,
  ConnectionType,
  LambdaIntegration, Model,
  PassthroughBehavior,
  RestApi
} from "@aws-cdk/aws-apigateway"
import {Stack} from "@aws-cdk/core"
import {Resource} from "@aws-cdk/aws-apigateway/lib/resource"
import {IFunction} from "@aws-cdk/aws-lambda"
import {integration200, integration400, method200, method400} from "./responses"
import {createRequestCommentModel} from "./models"

export const commentsPost = (
  scope: Stack,
  commentsCreate: IFunction,
  api: RestApi,
  resource: Resource,
  auth: CfnAuthorizer,
  genericIdResponseModel: Model
) => {
  const integration = new LambdaIntegration(commentsCreate, {
    proxy: false,
    allowTestInvoke: true,
    connectionType: ConnectionType.INTERNET,
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      'application/json': `
        #set($inputRoot = $input.path('$'))
        {
          "commentText": "$inputRoot.commentText",
          "eventId": "$inputRoot.eventId",
          "userId": "$context.authorizer.claims['cognito:username']"
        }
      `
    },
    integrationResponses: [integration200, integration400]
  })

  const requestModel = createRequestCommentModel(api)

  resource.addMethod('POST', integration, {
    requestModels: {'application/json': requestModel},
    authorizationType: AuthorizationType.COGNITO,
    authorizer: {authorizerId: auth.ref},
    requestParameters: {'method.request.header.Authorization': true},
    requestValidator: api.addRequestValidator('commentValidator', {
      validateRequestBody: true,
      validateRequestParameters: true
    }),
    methodResponses: [method200(genericIdResponseModel), method400]
  })
}