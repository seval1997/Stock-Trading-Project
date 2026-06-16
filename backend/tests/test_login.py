import pytest
import json
from unittest.mock import patch, MagicMock
import sys
import os

# Add the backend source to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from app import app


@pytest.fixture
def client():
    """Create a test client for the Flask app"""
    app.config['TESTING'] = True
    with app.test_client() as client:
        yield client


class TestLogin:
    """Tests for the login API"""

    @patch("src.users.login.users_collection.find_one")
    def test_login_success(self, mock_find, client):
        """Login with correct username and password"""
        mock_find.return_value = {"username": "test", "password": "secret"}

        response = client.post("/api/users/login", json={"username": "test", "password": "secret"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Login successful"

    @patch("src.users.login.users_collection.find_one")
    def test_login_invalid_password(self, mock_find, client):
        """Login with wrong password"""
        mock_find.return_value = {"username": "test", "password": "secret"}

        response = client.post("/api/users/login", json={"username": "test", "password": "wrong"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Invalid Username or Password"

    @patch("src.users.login.users_collection.find_one")
    def test_login_user_not_found(self, mock_find, client):
        """Login with non-existent user"""
        mock_find.return_value = None

        response = client.post("/api/users/login", json={"username": "ghost", "password": "nopass"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Invalid Username or Password"

    def test_login_missing_fields(self, client):
        """Login request missing username or password"""
        response = client.post("/api/users/login", json={"username": "test"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "Invalid Username or Password"
