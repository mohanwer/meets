import unittest
import aws_lambda.app.db.events as db
from moto import mock_dynamodb2


class TestDatabaseMethods(unittest.TestCase):

    def setUp(self):
        self._event = {
            'body': {
                'eventName': 'testName',
                'shortDescription': 'testShort',
                'longDescription': 'testlong',
                "address1": "$inputRoot.address1",
                "address2": "$inputRoot.address2",
                "city": "$inputRoot.city",
                "state": 'IN',
                "postal": "$inputRoot.postal",
                'userId': 'abc',
                'geoLocation': {
                    'lat': 39.76381960000001,
                    'lng': -86.24451190000002,
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
        return {'id': id}