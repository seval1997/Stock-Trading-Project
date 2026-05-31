import logging
import time
import ccxt

logger = logging.getLogger(__name__)

class DataFetcher:
    """Base class for fetching market data - Supports Indian stocks (yfinance) and Crypto (ccxt)."""

    def __init__(self, exchange_name="binance"):
        """
        Initialize DataFetcher with a crypto exchange.
        
        Args:
            exchange_name (str): Name of the crypto exchange (default: 'binance').
        """
        try:
            self.exchange = getattr(ccxt, exchange_name)()
            logger.info(f"Connected to {exchange_name} exchange via CCXT")
        except Exception as e:
            logger.error(f"Error initializing exchange {exchange_name}: {e}")
            self.exchange = None

    def fetch_crypto_price(self, symbol="BTC/USDT", interval=1, duration=10):
        """
        Fetch real-time crypto price at given interval.
        
        Args:
            symbol (str): Trading pair (e.g., 'BTC/USDT').
            interval (int): Interval in seconds between fetches.
            duration (int): Total duration in seconds to run the loop.
        
        Returns:
            None (prints live prices)
        """
        if not self.exchange:
            logger.error("Exchange not initialized")
            return

        logger.info(f"Fetching live crypto prices for {symbol} every {interval}s for {duration}s")
        start_time = time.time()

        while time.time() - start_time < duration:
            try:
                ticker = self.exchange.fetch_ticker(symbol)
                print(f"{symbol} price: {ticker['last']}")
            except Exception as e:
                logger.error(f"Error fetching ticker for {symbol}: {e}")
            time.sleep(interval)
