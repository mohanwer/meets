from time import time_ns
from uuid import uuid4
from .config import table


def create(event, context):
    print("Processing Create comment request:", event)
    current_time = time_ns()
    id = str(uuid4())
    comment = {
        'id': id,
        'commentText': event['commentText'],
        'created': current_time,
        'modified': current_time,
        'eventId': event['eventId'],
        'createdBy': event['userId'],
        'modifiedby': event['userId']
    }
    table.put_item(Item=comment)
    return {"id": id}

