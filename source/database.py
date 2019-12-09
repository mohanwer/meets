import boto3, time, uuid

RESOURCE_NAME = 'dynamodb'
REGION_NAME = 'us-east-2'
TABLE_NAME = 'Meets'

client = boto3.resource(RESOURCE_NAME, region_name=REGION_NAME)
table = client.Table(TABLE_NAME)

try:
    resp = client.create_table(
        TableName="Meets",
        KeySchema=[
            {
                "AttributeName": "id",
                "KeyType": "HASH"
            }
        ],
        AttributeDefinitions=[
            {
                "AttributeName": "id",
                "AttributeType": "S"
            },
            {
                "AttributeName": "name",
                "AttributeType": "S"
            },
            {
                "AttributeName": "long_description",
                "AttributeType": "S"
            },
            {
                "AttributeName": "short_description",
                "AttributeType": "S"
            },
            {
                "AttributeName": "modified",
                "AttributeType": "N"
            },
            {
                "AttributeName": "created",
                "AttributeType": "N"
            }
        ],
        ProvisionedThroughput={
            "ReadCapacityUnits": 5,
            "WriteCapacityUnits": 5
        }
    )
except Exception as e:
    print("Error failed to create table")
    print(e)

def create(event, context):
    current_time = time.time_ns()
    id = str(uuid.uuid4())
    new_event = {
        'id': id,
        'name': event['name'],
        'short_description': event['shortDescription'],
        'long_description': event['longDescription'],
        'modified': current_time,
        'created': current_time
    }
    table.put_item(Item=new_event)
    return id

def delete(event, context):
    id = event['id']
    key = {
        'id': id
    }
    table.delete_item(Key=key)

def get(event, context):
    id = event['id']
    key = {
        'id': id
    }
    item = table.get_item(Key=key)
    return item

def update(event, context):
    id = event['id']
