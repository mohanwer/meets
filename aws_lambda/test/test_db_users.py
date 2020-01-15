import unittest
import aws_lambda.app.db.users as users
from moto import mock_dynamodb2


class UserTestMethods(unittest.TestCase):

    @mock_dynamodb2
    def test_update_properties(self):
        event = {
            'userName': 'Google_107815658326545510890',
            'request': {
                'userAttributes': {
                    'name': 'Moh. Anwer',
                    'email': 'mohrocks4@gmail.com'
                }
            },
            'userPoolId': 'us-east-2_wTghw5Kon',
            'callerContext': {
                'clientId': '4ksagn3c8b53qee8almt63bo08'
            }
        }
        updated_event = users.update_user_properties(event, {})
        self.assertEqual(event, updated_event)
        pass
