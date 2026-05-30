"""Database connection and initialization."""

import logging
from peewee import SqliteDatabase
from src.config import DATABASE_PATH

logger = logging.getLogger(__name__)

# Initialize SQLite database
db = SqliteDatabase(str(DATABASE_PATH))

def init_db():
    """Initialize the database and create tables."""
    try:
        db.connect()
        logger.info(f"Database connected: {DATABASE_PATH}")
        return db
    except Exception as e:
        logger.error(f"Failed to connect to database: {e}")
        raise

def close_db():
    """Close the database connection."""
    if not db.is_closed():
        db.close()
        logger.info("Database connection closed")
