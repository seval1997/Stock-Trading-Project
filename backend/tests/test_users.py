import pytest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add backend source to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app import app


@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client


class TestUserData:
    """Tests for the userData API"""

    @patch("src.users.users.users_collection.find_one")
    def test_user_data_found(self, mock_find, client):
        """Return user data when user exists"""
        mock_find.return_value = {
            "_id": "mockid123",
            "username": "testuser",
            "email": "test@example.com"
        }

        response = client.get("/api/users/userData?username=testuser")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["id"] == "mockid123"
        assert data["username"] == "testuser"
        assert data["email"] == "test@example.com"

    @patch("src.users.users.users_collection.find_one")
    def test_user_data_not_found(self, mock_find, client):
        """Return message when user does not exist"""
        mock_find.return_value = None

        response = client.get("/api/users/userData?username=ghost")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "No user data found"

    @patch("src.users.users.users_collection.find_one")
    def test_user_data_missing_username(self, mock_find, client):
        """Return message when username query param is missing"""
        mock_find.return_value = None

        response = client.get("/api/users/userData")
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "No user data found"
