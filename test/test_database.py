import unittest, json
import source.database as db
from moto import mock_dynamodb2

class TestDatabaseMethods(unittest.TestCase):

    def setUp(self):
        self._event = {
            'eventName': 'testName',
            'shortDescription': 'testShort',
            'longDescription': 'testlong',
        }
        self._id = json.loads(db.create(self._event, {})['body'])['id']
        pass

    @mock_dynamodb2
    def test_create(self):
        id = json.loads(db.create(self._event, {})['body'])['id']
        created_item = json.loads(db.get(self.create_id_json(id), {})['body'])
        db.delete(self.create_id_json(id), {})
        self.assertEqual(self._event['eventName'], created_item['eventName'])

    @mock_dynamodb2
    def test_update(self):
        event = db.get(self.create_id_json(self._id), {})
        new_event = json.loads(event['body'])
        new_event['eventName'] = 'new_name'
        new_val = json.loads(db.update(new_event, {})['body'])
        self.assertEqual(new_event['eventName'], new_val['Attributes']['eventName'])

    @mock_dynamodb2
    def test_delete(self):
        db.delete(self.create_id_json(self._id), {})
        pass

    @mock_dynamodb2
    def test_get(self):
        db.get(self.create_id_json(self._id), {})
        pass

    def create_id_json(self, id):
        return {
            'queryStringParameters': {
                'id': id
            }
        }