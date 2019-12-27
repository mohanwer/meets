import unittest, json
import aws_lambda.events as db
from moto import mock_dynamodb2


class TestDatabaseMethods(unittest.TestCase):

    def setUp(self):
        self._event = {
            'body': {
                'eventName': 'testName',
                'shortDescription': 'testShort',
                'longDescription': 'testlong',
                'userId': 'abc',
            },
        }
        self._context = {}
        self._id = json.loads(db.create(self._event, self._context)['body'])['id']
        pass

    @mock_dynamodb2
    def test_create(self):
        id = json.loads(db.create(self._event, self._context)['body'])['id']
        created_item = json.loads(db.get(self.create_id_json(id), {})['body'])
        db.delete(self.create_id_json(id), {})
        self.assertEqual(self._event['body']['eventName'], created_item['eventName'])

    @mock_dynamodb2
    def test_update(self):
        new_event = {
            'body': {
                'eventName': 'newName',
                'shortDescription': 'testShort',
                'longDescription': 'testlong',
                'id': str(self._id),
                'userId': 'abcd',
            },
        }
        new_val = json.loads(db.update(new_event, {})['body'])
        self.assertEqual(new_event['body']['eventName'], new_val['Attributes']['eventName'])

    @mock_dynamodb2
    def test_delete(self):
        db.delete(self.create_id_json(self._id), self._context)
        pass

    @mock_dynamodb2
    def test_get(self):
        db.get(self.create_id_json(self._id), self._context)
        pass

    def create_id_json(self, id):
        return {
            'queryStringParameters': {
                'id': id
            }
        }