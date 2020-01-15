import cdk, {Stack} from '@aws-cdk/core'
import {createApi, createAuthorizer} from "./api/root"
import {createLambda, createLambdaRole, createApiResource} from "./lambda/common"
import {eventsGet, eventsPost} from "./api/events"
import {createResponseGenericIdModel} from "./api/models"
import {commentsPost} from "./api/comments"

export const stackProps: cdk.StackProps = {
  env: {
    region: 'us-east-2',
    account: '147730025470'
  },
  stackName: 'meets-stack'
};

export class MeetsStack extends Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, stackProps);

    const api = createApi(this)
    const genericIdResponseModel = createResponseGenericIdModel(api)
    const authorizer = createAuthorizer(this, api)
    const lambdaRole = createLambdaRole(this)

    const eventsCreate = createLambda(this, lambdaRole, 'Meets-Create', 'db.events.create')
    const eventsGetLambda = createLambda(this, lambdaRole, 'Meets-Get', 'db.events.get')
    const eventResource = createApiResource(this, api, 'events')
    eventsPost(this, eventsCreate, api, eventResource, authorizer, genericIdResponseModel)
    eventsGet(this, eventsGetLambda, api, eventResource)

    createLambda(this, lambdaRole, 'Meets-Users-Update', 'db.users.update_user_properties')
    const userResource = createApiResource(this, api, 'users')

    const commentsResource = createApiResource(this, api, 'comments')
    const commentsCreateLambda = createLambda(this, lambdaRole, 'Meets-Comments-Create', 'db.comments.create')
    commentsPost(this, commentsCreateLambda, api, commentsResource, authorizer, genericIdResponseModel)
  }
}