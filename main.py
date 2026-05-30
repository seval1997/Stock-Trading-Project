"""Main entry point for the Trading Project - Supports Stock & Crypto."""

import logging
import argparse
from src.utils import setup_logging
from src.crypto.data_fetcher import DataFetcher  # updated path

# Setup logging
logger = setup_logging()

def run_stock():
    """Fetch Indian stock data (NSE/BSE)."""
    symbols = [
        "TCS.NS", "INFY.NS", "WIPRO.NS", "RELIANCE.NS",
        "SBIN.NS", "HDFC.NS", "ITC.NS", "MARUTI.NS",
        "BAJAJFINSV.NS", "NESTLEIND.NS"
    ]
    logger.info("Starting to fetch Indian stock data...")
    for symbol in symbols:
        data = DataFetcher.fetch_yfinance(symbol, period="1y", interval="1d")
        if data is not None:
            logger.info(f"Fetched {symbol}: {len(data)} records")
            print(f"\n{symbol} - Sample Data:")
            print(data.head())
        else:
            logger.warning(f"No data retrieved for {symbol}")
    logger.info("All Indian stocks fetched successfully!")

def run_crypto():
    """Fetch live crypto data (Binance via CCXT)."""
    df = DataFetcher(exchange_name="binance")
    df.fetch_crypto_price(symbol="BTC/USDT", interval=1, duration=10)

def main():
    """Main entry point - choose stock or crypto mode."""
    parser = argparse.ArgumentParser(description="Trading Project")
    parser.add_argument("--stock", action="store_true", help="Run stock market logic")
    parser.add_argument("--crypto", action="store_true", help="Run crypto market logic")
    args = parser.parse_args()

    if args.stock:
        run_stock()
    elif args.crypto:
        run_crypto()
    else:
        logger.error("Please specify either --stock or --crypto")

if __name__ == "__main__":
    main()
