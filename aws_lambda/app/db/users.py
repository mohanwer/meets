import time
from .config import table


# Called after a user sign ins. This will receive user properties from cognito authorizer in api gateway.
# Once received the user properties will be saved to the dynamodb table. This allows the lookups against user_ids
# attached to events / groups / comments.
def update_user_properties(event, context):
    print("User Signed in:", event)
    current_time = time.time_ns()
    table.update_item(
        Key={'id': event['userName']},
        UpdateExpression='set displayName=:d, email=:e, poolId=:p, modified=:m, clientId=:c, #ty=:t',
        ExpressionAttributeValues={
            ':t': 'user',
            ':d': event['request']['userAttributes']['name'],
            ':e': event['request']['userAttributes']['email'],
            ':p': event['userPoolId'],
            ':c': event['callerContext']['clientId'],
            ':m': current_time,
        },
        ExpressionAttributeNames={
            "#ty": "type"
        }
    )
    return event
