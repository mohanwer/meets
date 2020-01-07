import {JsonSchemaType, JsonSchemaVersion, RestApi} from "@aws-cdk/aws-apigateway"

export const createResponseEventModel = (api: RestApi) => {
  return api.addModel('EventsResponseModel', {
    contentType: 'application/json',
    modelName: 'EventsCreateResponse',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: "EventPostResponse",
      type: JsonSchemaType.OBJECT,
      properties: {
        id: {
          type: JsonSchemaType.STRING
        }
      },
      required: ["id"]
    }
  })
}

export const createRequestEventModel = (api: RestApi) => {
  return api.addModel('EventRequestModel', {
    contentType: 'application/json',
    modelName: 'EventPostRequest',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'EventPostRequest',
      type: JsonSchemaType.OBJECT,
      properties: {
        eventName: {type: JsonSchemaType.STRING},
        shortDescription: {type: JsonSchemaType.STRING},
        longDescription: {type: JsonSchemaType.STRING},
        geoLocation: {
          type: JsonSchemaType.OBJECT,
          properties: {
            lat: {type: JsonSchemaType.NUMBER},
            lng: {type: JsonSchemaType.NUMBER}
          }
        }
      }
    }
  })
}
