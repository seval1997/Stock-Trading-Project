"""Database models for stock data using Peewee ORM."""

from datetime import datetime
from peewee import Model, CharField, FloatField, DateTimeField, IntegerField
from src.database import db


class BaseModel(Model):
    """Base model with common fields."""
    class Meta:
        database = db


class Stock(BaseModel):
    """Model for storing stock metadata."""
    symbol = CharField(unique=True, index=True)  # e.g., 'AAPL'
    name = CharField(default="")
    sector = CharField(default="")
    currency = CharField(default="USD")
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)

    class Meta:
        table_name = "stocks"

    def __str__(self):
        return f"{self.symbol} - {self.name}"


class StockPrice(BaseModel):
    """Model for storing daily stock price data."""
    stock = CharField(index=True)  # Foreign key reference (symbol)
    date = DateTimeField(index=True)
    open_price = FloatField()
    high_price = FloatField()
    low_price = FloatField()
    close_price = FloatField()
    volume = IntegerField(default=0)
    adjusted_close = FloatField(default=0.0)
    created_at = DateTimeField(default=datetime.now)

    class Meta:
        table_name = "stock_prices"
        indexes = (
            (('stock', 'date'), True),  # Unique constraint on stock + date
        )

    def __str__(self):
        return f"{self.stock} - {self.date.strftime('%Y-%m-%d')} - Close: ${self.close_price}"


class Portfolio(BaseModel):
    """Model for storing portfolio information."""
    name = CharField(unique=True)
    description = CharField(default="")
    initial_investment = FloatField(default=0.0)
    created_at = DateTimeField(default=datetime.now)
    updated_at = DateTimeField(default=datetime.now)

    class Meta:
        table_name = "portfolios"

    def __str__(self):
        return f"Portfolio: {self.name}"


class PortfolioPosition(BaseModel):
    """Model for storing positions in a portfolio."""
    portfolio = CharField(index=True)  # Portfolio name
    stock_symbol = CharField(index=True)
    quantity = FloatField()
    purchase_price = FloatField()
    purchase_date = DateTimeField()
    created_at = DateTimeField(default=datetime.now)

    class Meta:
        table_name = "portfolio_positions"

    def __str__(self):
        return f"{self.stock_symbol} x {self.quantity} in {self.portfolio}"


# Create all tables
def create_tables():
    """Create all database tables."""
    db.create_tables([Stock, StockPrice, Portfolio, PortfolioPosition])
