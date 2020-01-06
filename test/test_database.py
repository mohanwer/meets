import unittest, json
import aws_lambda.events as db
from moto import mock_dynamodb2
from decimal import Decimal

class TestDatabaseMethods(unittest.TestCase):

    def setUp(self):
        self._event = {
            'body': {
                'eventName': 'testName',
                'shortDescription': 'testShort',
                'longDescription': 'testlong',
                'userId': 'abc',
                'geoLocation': {
                    'lat': Decimal('39.8765056'),
                    'lng': Decimal('-86.1437945'),
                }
            },
        }
        self._context = {}
        self._id = db.create(self._event, self._context)['id']
        pass

    @mock_dynamodb2
    def test_create(self):
        id = db.create(self._event, self._context)['id']
        created_item = db.get(self.create_id_json(id), {})
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
        new_val = db.update(new_event, {})
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