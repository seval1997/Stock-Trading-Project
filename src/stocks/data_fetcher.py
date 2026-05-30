"""Fetch stock data from various sources (yfinance) - Indian Market Focus."""

import logging
from datetime import datetime, timedelta
import yfinance as yf
from src.stocks.config import YFINANCE_TIMEOUT

logger = logging.getLogger(__name__)


class DataFetcher:
    """Base class for fetching stock data - Supports Indian stocks (NSE/BSE)."""

    @staticmethod
    def fetch_yfinance(symbol, period="1y", interval="1d"):
        """
        Fetch stock data using yfinance.
        
        For Indian stocks use:
        - SYMBOL.NS for NSE (National Stock Exchange) stocks
        - SYMBOL.BO for BSE (Bombay Stock Exchange) stocks
        
        Args:
            symbol (str): Stock symbol with exchange (e.g., 'TCS.NS', 'INFY.NS', 'SBIN.BO')
            period (str): Time period ('1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max')
            interval (str): Data interval ('1m', '5m', '15m', '30m', '60m', '1d', '1wk', '1mo')
        
        Returns:
            pd.DataFrame: Stock data with OHLCV columns
            
        Examples:
            - fetch_yfinance("TCS.NS", period="1y")      # TCS from NSE
            - fetch_yfinance("INFY.NS", period="6mo")    # Infosys from NSE
            - fetch_yfinance("SBIN.NS", period="1y")     # SBI from NSE
        """
        try:
            logger.info(f"Fetching data for {symbol} from yfinance (period: {period}, interval: {interval})")
            ticker = yf.Ticker(symbol)
            hist = ticker.history(period=period, interval=interval)
            
            if hist.empty:
                logger.warning(f"No data retrieved for {symbol}. Check if symbol is correct (e.g., TCS.NS, INFY.NS)")
                return None
            
            logger.info(f"Successfully fetched {len(hist)} records for {symbol}")
            return hist
        
        except Exception as e:
            logger.error(f"Error fetching data for {symbol}: {e}")
            return None


