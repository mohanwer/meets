import {Stack} from "@aws-cdk/core"
import {
  Resource,
  RestApi
} from "@aws-cdk/aws-apigateway"

export const createUsersResource = (scope: Stack, api: RestApi): Resource => {
  return api.root.addResource('users', {})
}