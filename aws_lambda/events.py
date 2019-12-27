import boto3, time, uuid, json
from decimal import Decimal

RESOURCE_NAME = 'dynamodb'
REGION_NAME = 'us-east-2'
TABLE_NAME = 'Meets'

client = boto3.resource(RESOURCE_NAME, region_name=REGION_NAME)
table = client.Table(TABLE_NAME)


def create(event, context):
    print('Processing Create request:', event)
    print('Contexxt: ', context)
    current_time = time.time_ns()
    id = str(uuid.uuid4())
    body = event['body']
    new_event = {
        'id': id,
        'eventName': body['eventName'],
        'shortDescription': body['shortDescription'],
        'longDescription': body['longDescription'],
        'modifiedBy': body['userId'],
        'createdBy': body['userId'],
        'modified': current_time,
        'created': current_time
    }
    table.put_item(Item=new_event)
    return format_response({'id': id})


def delete(event, context):
    print('Processing Delete request:', event)
    id = event['queryStringParameters']['id']
    key = {
        'id': id
    }
    table.delete_item(Key=key)
    return format_response({})


def get(event, context):
    print('Processing Get request:', event)
    id = event['queryStringParameters']['id']
    key = {
        'id': id
    }
    item = table.get_item(Key=key)
    return format_response(item['Item'])


def update(event, context):
    print('Processing Update request:', event)
    body = event['body']
    id = body['id']
    current_time = time.time_ns()
    response = table.update_item(
        Key={'id': id},
        UpdateExpression="set eventName=:n, shortDescription=:s, "
                         "longDescription=:l, modified=:t, modifiedBy=:m",
        ExpressionAttributeValues={
            ':n': body['eventName'],
            ':s': body['shortDescription'],
            ':l': body['longDescription'],
            ':m': body['userId'],
            ':t': current_time
        },
        ReturnValues='UPDATED_NEW'
    )
    return format_response(response)


def format_response(body):
    decimals_converted = replace_decimals(body)
    formatted_body = json.dumps(decimals_converted)
    return {
        'isBase64Encoded': False,
        'statusCode': 200,
        'headers': {},
        'body': formatted_body
    }


def replace_decimals(obj):
    if isinstance(obj, list):
        for i in range(len(obj)):
            obj[i] = replace_decimals(obj[i])
        return obj
    elif isinstance(obj, dict):
        for k in obj.keys():
            obj[k] = replace_decimals(obj[k])
        return obj
    elif isinstance(obj, Decimal):
        if obj % 1 == 0:
            return int(obj)
        else:
            return float(obj)
    else:
        return obj