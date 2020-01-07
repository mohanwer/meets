import cdk, {Stack} from '@aws-cdk/core'
import {createApi, createAuthorizer} from "./api/root"
import {createLambda, createLambdaRole} from "./lambda/common"
import {createEventResource, eventsPost} from "./api/events"

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
    const eventsCreate = createLambda(this, lambdaRole, 'Meets-Create', 'events.create')
    const eventResource = createEventResource(this, api)
    const postMethod = eventsPost(this, eventsCreate, api, eventResource, authorizer)
  }
}