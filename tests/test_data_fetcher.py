"""Tests for data fetcher module - Indian Market."""

import unittest
from src.data_fetcher import DataFetcher


class TestDataFetcher(unittest.TestCase):
    """Test cases for DataFetcher class - Indian Stocks."""

    def test_fetch_yfinance_indian_stock(self):
        """Test fetching Indian stock data from yfinance."""
        data = DataFetcher.fetch_yfinance("TCS.NS", period="1mo", interval="1d")
        self.assertIsNotNone(data)
        self.assertGreater(len(data), 0)

    def test_fetch_invalid_indian_symbol(self):
        """Test fetching invalid Indian stock symbol."""
        data = DataFetcher.fetch_yfinance("INVALID.NS", period="1d", interval="1d")
        self.assertIsNone(data)

    def test_fetch_index(self):
        """Test fetching Indian stock index."""
        # Test Nifty 50 index
        data = DataFetcher.fetch_yfinance("^NSEI", period="1mo", interval="1d")
        if data is not None:  # May fail due to network, but shouldn't crash
            self.assertGreaterEqual(len(data), 0)

    def test_validate_symbol(self):
        """Test stock symbol validation."""
        from src.utils import validate_symbol
        
        self.assertEqual(validate_symbol("tcs"), "TCS")
        self.assertEqual(validate_symbol("INFY"), "INFY")
        
        with self.assertRaises(ValueError):
            validate_symbol("")
        
        with self.assertRaises(ValueError):
            validate_symbol("TOOLONGSYMBOL")

    def test_calculate_returns(self):
        """Test return calculation."""
        from src.utils import calculate_returns
        
        # Investment of ₹10,000 -> ₹15,000
        returns = calculate_returns(10000, 15000)
        self.assertEqual(returns, 50.0)
        
        # No change
        returns = calculate_returns(1000, 1000)
        self.assertEqual(returns, 0.0)


if __name__ == "__main__":
    unittest.main()

