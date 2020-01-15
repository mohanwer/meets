import unittest
import aws_lambda.app.db.comments as comments
import aws_lambda.app.db.events as events
from.test_db_events import mock_event
from moto import mock_dynamodb2


class CommentTestMethods(unittest.TestCase):

    def setUp(self):
        self._event_id = events.create(mock_event, {})['id']
        self._comment = {
            'commentText': 'some test',
            'eventId': self._event_id,
            'userId': 'Google_107815658326545510890'
        }

    @mock_dynamodb2
    def test_create(self):
        comment_id = comments.create(self._comment, {})
        pass