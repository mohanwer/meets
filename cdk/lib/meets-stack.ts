import cdk, {Stack} from '@aws-cdk/core'
import {createApi, createAuthorizer} from "./api/root"
import {createLambda, createLambdaRole} from "./lambda/common"
import {createEventResource, eventsGet, eventsPost} from "./api/events"
import {createUsersResource} from "./api/users"

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
    const authorizer = createAuthorizer(this, api)
    const lambdaRole = createLambdaRole(this)
    const eventsCreate = createLambda(this, lambdaRole, 'Meets-Create', 'db.events.create')
    const eventsGetLambda = createLambda(this, lambdaRole, 'Meets-Get', 'db.events.get')
    const eventResource = createEventResource(this, api)
    const postMethod = eventsPost(this, eventsCreate, api, eventResource, authorizer)
    const getMethod = eventsGet(this, eventsGetLambda, api, eventResource)

    const userUpdateLambda = createLambda(this, lambdaRole, 'Meets-Users-Update', 'db.users.update_user_properties')
    const userResource = createUsersResource(this, api)
  }
}