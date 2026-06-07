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


class TestNSESymbols:
    """Test NSE symbols fetching endpoint"""
    
    @patch('src.stocks.dataFetch.requests.get')
    def test_fetch_nse_symbols_success(self, mock_get, client):
        """Test successful NSE symbols fetch"""
        mock_csv_data = "SYMBOL\nTCS\nINFY\nHDFCBANK\n"
        mock_response = MagicMock()
        mock_response.text = mock_csv_data
        mock_get.return_value = mock_response
        
        response = client.get('/api/stocks/nse-symbols')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert isinstance(data, list)
        assert 'TCS' in data
        assert 'INFY' in data
    
    @patch('src.stocks.dataFetch.requests.get')
    def test_fetch_nse_symbols_failure(self, mock_get, client):
        """Test NSE symbols fetch with network error"""
        mock_get.side_effect = Exception("Network error")
        
        # When an exception is raised, Flask returns a 500 error
        response = client.get('/api/stocks/nse-symbols')
        assert response.status_code == 500


class TestStockData:
    """Test stock data fetching endpoint"""
    
    @patch('src.stocks.dataFetch.yf.Ticker')
    def test_get_stock_data_by_symbol(self, mock_ticker, client):
        """Test getting stock data for a symbol"""
        mock_hist = MagicMock()
        mock_hist.reset_index().to_dict.return_value = [
            {"Date": "2024-01-01", "Open": 100, "Close": 105}
        ]
        
        mock_ticker_instance = MagicMock()
        mock_ticker_instance.history.return_value = mock_hist
        mock_ticker.return_value = mock_ticker_instance
        
        response = client.get('/api/stocks/get_stock_data_by_symbol?symbol=TCS&interval=1d&period=1mo')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['symbol'] == 'TCS'
        assert data['interval'] == '1d'
        assert data['period'] == '1mo'
        assert 'data' in data
    
    @patch('src.stocks.dataFetch.yf.Ticker')
    def test_get_stock_data_default_params(self, mock_ticker, client):
        """Test stock data with default parameters"""
        mock_hist = MagicMock()
        mock_hist.reset_index().to_dict.return_value = []
        
        mock_ticker_instance = MagicMock()
        mock_ticker_instance.history.return_value = mock_hist
        mock_ticker.return_value = mock_ticker_instance
        
        response = client.get('/api/stocks/get_stock_data_by_symbol?symbol=TCS')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['interval'] == '1d'  # default
        assert data['period'] == '1mo'   # default


class TestNifty50Dashboard:
    """Test Nifty50 dashboard endpoint"""
    
    @patch('src.stocks.dataFetch.yf.Ticker')
    def test_nifty50_dashboard_card(self, mock_ticker, client):
        """Test Nifty50 dashboard data"""
        import pandas as pd
        from datetime import datetime, timedelta
        
        # Create mock data with proper DataFrame structure
        yesterday = datetime.now() - timedelta(days=1)
        today = datetime.now()
        
        mock_data = pd.DataFrame({
            'Open': [20000.0, 20100.0],
            'High': [20150.0, 20200.0],
            'Low': [19950.0, 20050.0],
            'Close': [20100.0, 20250.0],
            'Volume': [1000000, 1100000]
        }, index=pd.DatetimeIndex([yesterday, today], name='Date'))
        
        mock_ticker_instance = MagicMock()
        mock_ticker_instance.history.return_value = mock_data
        mock_ticker.return_value = mock_ticker_instance
        
        response = client.get('/api/stocks/nifty50_dashboard_card')
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data['symbol'] == 'Nifty 50'
        assert 'closingDiff' in data
        assert 'closingPercentageChange' in data
        assert 'date' in data
        assert 'data' in data
        # Verify the closing difference calculation
        expected_diff = 20250.0 - 20100.0  # Today close - Yesterday close
        assert data['closingDiff'] == expected_diff
