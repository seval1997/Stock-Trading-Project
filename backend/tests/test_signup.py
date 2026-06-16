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


class TestSignup:
    """Tests for the signup API"""

    @patch("src.users.signup.users_collection.insert_one")
    def test_signup_success(self, mock_insert, client):
        """Signup with valid data"""
        mock_insert.return_value = None

        response = client.post("/api/users/signup", json={
            "username": "testuser",
            "email": "test@example.com",
            "password": "secret"
        })
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "User registered successfully"


class TestAddUserProfile:
    """Tests for the addUserProfile API"""

    @patch("src.users.signup.userExist")
    @patch("src.users.signup.userProfileExist")
    @patch("src.users.signup.usersProfile_collection.update_one")
    def test_update_existing_profile(self, mock_update, mock_profileExist, mock_userExist, client):
        """Update profile when user and profile exist"""
        mock_userExist.return_value = True
        mock_profileExist.return_value = True
        mock_update.return_value = MagicMock(modified_count=1)

        response = client.post("/api/users/addUserProfile", json={
            "name": "Test User",
            "mobile": "1234567890",
            "dob": "2000-01-01",
            "username": "testuser"
        })
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "updated successfully" in data["message"]

    @patch("src.users.signup.userExist")
    @patch("src.users.signup.userProfileExist")
    @patch("src.users.signup.usersProfile_collection.insert_one")
    def test_create_new_profile(self, mock_insert, mock_profileExist, mock_userExist, client):
        """Create profile when user exists but profile does not"""
        mock_userExist.return_value = True
        mock_profileExist.return_value = False
        mock_insert.return_value = None

        response = client.post("/api/users/addUserProfile", json={
            "name": "New User",
            "mobile": "9876543210",
            "dob": "1995-05-05",
            "username": "newuser"
        })
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "created successfully" in data["message"]

    @patch("src.users.signup.userExist")
    def test_user_not_exist(self, mock_userExist, client):
        """Return error when user account does not exist"""
        mock_userExist.return_value = False

        response = client.post("/api/users/addUserProfile", json={
            "name": "Ghost User",
            "mobile": "0000000000",
            "dob": "1990-01-01",
            "username": "ghost"
        })
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["message"] == "user account doesn't exist."
