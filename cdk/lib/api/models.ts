import {JsonSchemaType, JsonSchemaVersion, Model, RestApi} from "@aws-cdk/aws-apigateway"

export const createResponseGenericIdModel = (api: RestApi): Model => {
  return api.addModel('GenericResponseModel', {
    contentType: 'application/json',
    modelName: 'GenericIdResponse',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: "Generic Id Response",
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

export const createRequestEventModel = (api: RestApi): Model => {
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
        address1: {type: JsonSchemaType.STRING},
        address2: {type: JsonSchemaType.STRING},
        city: {type: JsonSchemaType.STRING},
        state: {type: JsonSchemaType.STRING},
        postal: {type: JsonSchemaType.STRING},
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

export const createGetResponseEventModel = (api: RestApi): Model => {
  return api.addModel('EventResponseModel', {
    contentType: 'application/json',
    modelName: 'EventGetResponse',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'Event Get Response',
      type: JsonSchemaType.OBJECT,
      properties: {
        id: {type: JsonSchemaType.STRING},
        eventName: {type: JsonSchemaType.STRING},
        shortDescription: {type: JsonSchemaType.STRING},
        longDescription: {type: JsonSchemaType.STRING},
        address1: {type: JsonSchemaType.STRING},
        address2: {type: JsonSchemaType.STRING},
        city: {type: JsonSchemaType.STRING},
        state: {type: JsonSchemaType.STRING},
        postal: {type: JsonSchemaType.STRING},
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

export const createRequestCommentModel = (api: RestApi): Model => {
  return api.addModel('CommentRequestModel', {
    contentType: 'application/json',
    modelName: 'CommentPostRequest',
    schema: {
      schema: JsonSchemaVersion.DRAFT4,
      title: 'Comment Post Request',
      type: JsonSchemaType.OBJECT,
      properties: {
        commentText: {type: JsonSchemaType.STRING},
        eventId: {type: JsonSchemaType.STRING},
      }
    }
  })
}