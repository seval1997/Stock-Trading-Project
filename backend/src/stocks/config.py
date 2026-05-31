"""Configuration settings for the Stock Trading Project - Indian Market."""

import os
from pathlib import Path
from zoneinfo import ZoneInfo

# Project root directory
PROJECT_ROOT = Path(__file__).parent.parent

# Data directory
DATA_DIR = PROJECT_ROOT / "data"
DATA_DIR.mkdir(exist_ok=True)

# Logs directory
LOGS_DIR = PROJECT_ROOT / "logs"
LOGS_DIR.mkdir(exist_ok=True)

# Database settings
DATABASE_PATH = DATA_DIR / "stocks.db"

# Market Settings - Indian Stock Market
MARKET_TIMEZONE = ZoneInfo("Asia/Kolkata")  # IST - Indian Standard Time
MARKET_NAME = "NSE/BSE (India)"
MARKET_OPEN_HOUR = 9  # 9:15 AM IST
MARKET_CLOSE_HOUR = 16  # 3:30 PM IST

# API Keys (load from environment variables for security)
ALPHA_VANTAGE_KEY = os.getenv("ALPHA_VANTAGE_KEY", "demo")  # Replace with your API key
YFINANCE_TIMEOUT = int(os.getenv("YFINANCE_TIMEOUT", "10"))

# Stock data settings
DEFAULT_INTERVAL = "1d"  # Daily intervals
DEFAULT_OUTPUT_SIZE = "full"  # full or compact

# Logging settings
LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
LOG_FILE = LOGS_DIR / "trading.log"

# Supported data sources
DATA_SOURCES = {
    "yfinance": "Free, no API key required (supports Indian NSE/BSE stocks)"
}

# Indian Stock Market Exchanges
EXCHANGES = {
    "NSE": {
        "name": "National Stock Exchange",
        "suffix": ".NS",
        "description": "Largest and most liquid exchange in India"
    },
    "BSE": {
        "name": "Bombay Stock Exchange",
        "suffix": ".BO",
        "description": "Oldest exchange in Asia"
    }
}

# Database query batch size
BATCH_SIZE = 100

# Indian Stock Indices
INDICES = {
    "^NSEI": "Nifty 50 (NSE Main Index)",
    "^BSESN": "Sensex (BSE Main Index)",
    "^NSEBANK": "Nifty Bank Index",
    "^NSEINFRA": "Nifty Infrastructure Index"
}
