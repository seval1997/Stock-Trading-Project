"""Example usage and main entry point for the Stock Trading Project - Indian Market."""

import logging
from src.utils import setup_logging
from src.data_fetcher import DataFetcher

# Setup logging
logger = setup_logging()


def main():
    """Main entry point - Example: Fetch Indian stock data."""
    
    # List of Indian stocks to fetch (NSE symbols)
    # Format: SYMBOL.NS for NSE (National Stock Exchange)
    # Format: SYMBOL.BO for BSE (Bombay Stock Exchange)
    symbols = [
        "TCS.NS",          # Tata Consultancy Services
        "INFY.NS",         # Infosys Limited
        "WIPRO.NS",        # Wipro Limited
        "RELIANCE.NS",     # Reliance Industries
        "SBIN.NS",         # State Bank of India
        "HDFC.NS",         # HDFC Bank
        "ITC.NS",          # ITC Limited
        "MARUTI.NS",       # Maruti Suzuki
        "BAJAJFINSV.NS",   # Bajaj Finserv
        "NESTLEIND.NS"     # Nestle India
    ]
    
    try:
        logger.info("Starting to fetch Indian stock data...")
        for symbol in symbols:
            logger.info(f"Fetching data for {symbol}...")
            
            # Fetch stock data (1 year of historical data, daily intervals)
            data = DataFetcher.fetch_yfinance(
                symbol,
                period="1y",
                interval="1d"
            )
            
            if data is not None:
                logger.info(f"Successfully fetched {symbol}: {len(data)} records")
                # Print first few rows
                print(f"\n{symbol} - Sample Data:")
                print(data.head())
            else:
                logger.warning(f"No data retrieved for {symbol}")
        
        logger.info("All Indian stocks fetched successfully!")
    
    except Exception as e:
        logger.error(f"Error in main: {e}")


if __name__ == "__main__":
    main()

