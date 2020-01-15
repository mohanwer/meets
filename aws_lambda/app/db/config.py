import boto3

RESOURCE_NAME = 'dynamodb'
REGION_NAME = 'us-east-2'
TABLE_NAME = 'Meets'

client = boto3.resource(RESOURCE_NAME, region_name=REGION_NAME)
table = client.Table(TABLE_NAME)

