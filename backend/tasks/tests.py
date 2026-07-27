from django.test import TestCase

from .models import Task


class TaskModelTest(TestCase):
    def test_task_string_returns_title(self):
        task = Task.objects.create(title="Learn React")

        self.assertEqual(str(task), "Learn React")
