"""Main entry point for the Trading Project - Supports Stock & Crypto."""

import logging
import argparse
from src.utils import setup_logging
from src.crypto.data_fetcher import DataFetcher as CryptoDataFetcher  # updated path
from src.stocks.data_fetcher import DataFetcher as StockDataFetcher  # Indian stock data fetcher (yfinance)
import matplotlib.pyplot as plt

# Setup logging
logger = setup_logging()

def run_stock():
    """Fetch Indian stock data (NSE/BSE)."""
    symbols = [
        "TCS.NS"          # Tata Consultancy Services
    ]
    
    try:
        logger.info("Starting to fetch Indian stock data...")
        for symbol in symbols:
            logger.info(f"Fetching data for {symbol}...")
            
            # Fetch stock data (1 year of historical data, daily intervals)
            data = StockDataFetcher.fetch_yfinance(
                symbol,
                period="1y",
                interval="1d"
            )
            
            if data is not None:
                logger.info(f"Successfully fetched {symbol}: {len(data)} records")
                # Print first few rows
                print(f"\n{symbol} - Sample Data:")
                print(data)
                plot_graph(data, symbol)
            else:
                logger.warning(f"No data retrieved for {symbol}")
        
        logger.info("All Indian stocks fetched successfully!")
    
    except Exception as e:
        logger.error(f"Error in main: {e}")

def plot_graph(data, symbol):
    """Plot the data into the graphs"""
    print(f"Plotting data for {symbol}...")
    plt.figure(figsize=(14,8))
    # Plot Open (blue line)
    plt.plot(data.index, data['Open'], color='blue', label='Open')

    # Plot High (green line)
    plt.plot(data.index, data['High'], color='green', label='High')

    # Plot Low (red line)
    plt.plot(data.index, data['Low'], color='red', label='Low')

    # Plot Close (black dots)
    plt.scatter(data.index, data['Close'], color='black', s=10, label='Close')

    # Plot Volume as bar chart (secondary axis)
    ax1 = plt.gca()
    ax2 = ax1.twinx()
    ax2.bar(data.index, data['Volume'], color='gray', alpha=0.3, width=0.0005, label='Volume')

    # Titles and labels
    plt.title(f"{symbol} Intraday (1m interval)")
    ax1.set_xlabel("Time")
    ax1.set_ylabel("Price")
    ax2.set_ylabel("Volume")

    # Legends
    ax1.legend(loc="upper left")
    ax2.legend(loc="upper right")

    plt.show()


def run_crypto():
    """Fetch live crypto data (Binance via CCXT)."""
    df = CryptoDataFetcher(exchange_name="binance")
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
