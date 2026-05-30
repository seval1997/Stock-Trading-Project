"""Utility functions for the stock trading project."""

import logging
from datetime import datetime
from src.config import LOG_FILE, LOG_LEVEL


def setup_logging():
    """Configure logging for the application."""
    logging.basicConfig(
        level=getattr(logging, LOG_LEVEL),
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
        handlers=[
            logging.FileHandler(LOG_FILE),
            logging.StreamHandler()
        ]
    )
    logger = logging.getLogger(__name__)
    logger.info("Logging initialized")
    return logger


def format_currency(value, currency="USD"):
    """Format a value as currency."""
    return f"${value:,.2f}" if currency == "USD" else f"{value:,.2f} {currency}"


def calculate_returns(initial, final):
    """Calculate percentage returns."""
    if initial == 0:
        return 0
    return ((final - initial) / initial) * 100


def parse_date(date_str, format="%Y-%m-%d"):
    """Parse a date string to datetime object."""
    try:
        return datetime.strptime(date_str, format)
    except ValueError:
        raise ValueError(f"Invalid date format: {date_str}. Expected: {format}")


def validate_symbol(symbol):
    """Validate stock symbol format."""
    if not isinstance(symbol, str) or len(symbol) < 1 or len(symbol) > 5:
        raise ValueError(f"Invalid stock symbol: {symbol}")
    return symbol.upper()
