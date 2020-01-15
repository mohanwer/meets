import time, uuid, boto3
from decimal import Decimal
from .config import table


def create(event, context):
    print("Processing Create request:", event)
    current_time = time.time_ns()
    id = str(uuid.uuid4())
    body = event["body"]
    new_event = {
        "id": id,
        "type": "event",
        "eventName": body["eventName"],
        "shortDescription": body["shortDescription"],
        "longDescription": body["longDescription"],
        "address1": body["address1"],
        "address2": body["address2"],
        "city": body["city"],
        "state": body["state"],
        "postal": body["postal"],
        "geoLocation": {
            # Todo: check the right way to cast float to decimals
            "lat": Decimal(str(body["geoLocation"]["lat"])),
            "lng": Decimal(str(body["geoLocation"]["lng"]))
        },
        "modifiedBy": body["userId"],
        "createdBy": body["userId"],
        "modified": current_time,
        "created": current_time
    }
    table.put_item(Item=new_event)
    return {"id": id}


def delete(event, context):
    print("Processing Delete request:", event)
    id = event["id"]
    key = {
        "id": id
    }
    table.delete_item(Key=key)
    return {}


def get(event, context):
    print("Processing Get request:", event)
    id = event["id"]
    key = {
        "id": id
    }
    item = table.get_item(Key=key)
    return item['Item']


def update(event, context):
    print("Processing Update request:", event)
    body = event["body"]
    id = body["id"]
    current_time = time.time_ns()
    response = table.update_item(
        Key={"id": id},
        UpdateExpression="set eventName=:n, shortDescription=:s, "
                         "longDescription=:l, modified=:t, modifiedBy=:m",
        ConditionExpression="#ty = :ty",
        ExpressionAttributeValues={
            ':n': body['eventName'],
            ':s': body['shortDescription'],
            ':l': body['longDescription'],
            ':m': body['userId'],
            ':t': current_time,
            ':ty': 'event'
        },
        ExpressionAttributeNames={
          '#ty': 'type'
        },
        ReturnValues='UPDATED_NEW'
    )
    return response
