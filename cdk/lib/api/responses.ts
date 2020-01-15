import {IntegrationResponse, MethodResponse} from "@aws-cdk/aws-apigateway"
import {Model} from "@aws-cdk/aws-apigateway/lib/model"

export const integration200: IntegrationResponse = {
  statusCode: '200',
  responseParameters: {
    'method.response.header.Content-Type': "'application/json'",
    'method.response.header.Access-Control-Allow-Origin': "'*'",
    'method.response.header.Access-Control-Allow-Credentials': "'true'"
  },
  selectionPattern: "^$"
}

export const integration400: IntegrationResponse = {
  selectionPattern: '.*"errorMessage".*',
  statusCode: "400",
  responseParameters:{
    'method.response.header.Content-Type': "'application/json'",
    'method.response.header.Access-Control-Allow-Origin': "'*'",
    'method.response.header.Access-Control-Allow-Credentials': "'true'"
  },
  responseTemplates: {
      'application/json': JSON.stringify({
        state: 'error',
        message: "$util.escapeJavaScript($input.path('$.errorMessage'))"
      })
  },
}

export const methodResponseParams = {
  'method.response.header.Content-Type': true,
  'method.response.header.Access-Control-Allow-Origin': true,
  'method.response.header.Access-Control-Allow-Credentials': true
}

export const method200 = (responseModel: Model): MethodResponse => ({
    statusCode: "200",
    responseModels: {
      "application/json": responseModel
    },
    responseParameters: methodResponseParams
})

export const method200NoBody: MethodResponse = {
  statusCode: "200",
  responseParameters: methodResponseParams
}

export const method400: MethodResponse = {
  statusCode: "400",
  responseModels: {
    "application/json": Model.ERROR_MODEL
  },
  responseParameters: methodResponseParams
}