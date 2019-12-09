import unittest
import source.database as db

class TestDatabaseMethods(unittest.TestCase):

    def test_create(self):
        context = {}
        event = {
            'name': 'testname',
            'shortDescription': 'testshort',
            'longDescription': 'testlong',
        }
        id = db.create(event, context)
        created_item = db.get({'id': id}, context)
        db.delete({'id': id}, context)
        self.assertEqual('testname', created_item['Item']['name'], event['name'])