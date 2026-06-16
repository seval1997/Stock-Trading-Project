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


class TestWatchList:
    """Tests for stock watchlist APIs"""

    @patch("src.stocks.stockWatchlist.userExist")
    @patch("src.stocks.stockWatchlist.watchList_collection.update_one")
    def test_add_symbol_new_user(self, mock_update, mock_userExist, client):
        """Add symbol when user does not exist (update path)"""
        mock_userExist.return_value = False
        mock_update.return_value = MagicMock(modified_count=1)

        response = client.post("/api/stocks/addStockWatchList", json={"username": "test", "symbol": "TCS"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "added successfully" in data["message"]

    @patch("src.stocks.stockWatchlist.userExist")
    @patch("src.stocks.stockWatchlist.watchList_collection.insert_one")
    def test_add_symbol_existing_user(self, mock_insert, mock_userExist, client):
        """Add symbol when user exists (insert path)"""
        mock_userExist.return_value = True
        mock_insert.return_value = None

        response = client.post("/api/stocks/addStockWatchList", json={"username": "test", "symbol": "INFY"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "added successfully" in data["message"]

    @patch("src.stocks.stockWatchlist.watchList_collection.update_one")
    def test_remove_symbol(self, mock_update, client):
        """Remove symbol successfully"""
        mock_update.return_value = MagicMock(modified_count=1)

        response = client.post("/api/stocks/removeStockWatchList", json={"username": "test", "symbol": "TCS"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "removed successfully" in data["message"]

    @patch("src.stocks.stockWatchlist.watchList_collection.update_one")
    def test_remove_symbol_not_present(self, mock_update, client):
        """Remove symbol that is not present"""
        mock_update.return_value = MagicMock(modified_count=0)

        response = client.post("/api/stocks/removeStockWatchList", json={"username": "test", "symbol": "XYZ"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "not present" in data["message"]

    @patch("src.stocks.stockWatchlist.watchList_collection.find_one")
    def test_get_watchlist_found(self, mock_find, client):
        """Get watchlist when data exists"""
        mock_find.return_value = {"username": "test", "watchlist": [{"symbol": "TCS"}]}

        response = client.post("/api/stocks/getStockWatchList", json={"username": "test"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "watchlist" in data
        assert data["watchlist"][0]["symbol"] == "TCS"

    @patch("src.stocks.stockWatchlist.watchList_collection.find_one")
    def test_get_watchlist_not_found(self, mock_find, client):
        """Get watchlist when no data exists"""
        mock_find.return_value = None

        response = client.post("/api/stocks/getStockWatchList", json={"username": "ghost"})
        assert response.status_code == 200
        data = json.loads(response.data)
        assert "not stock data found" in data["message"]
