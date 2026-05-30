# API Guide - Stock Trading Project (Indian Market)

## DataFetcher API

### fetch_yfinance(symbol, period='1y', interval='1d')
Fetch Indian stock data using yfinance (NSE/BSE).

**Parameters:**
- `symbol` (str): Stock symbol with exchange suffix
  - **.NS** - NSE (National Stock Exchange)
  - **.BO** - BSE (Bombay Stock Exchange)
  - Examples: 'TCS.NS', 'INFY.NS', 'SBIN.BO'
- `period` (str): Time period - '1d', '5d', '1mo', '3mo', '6mo', '1y', '2y', '5y', '10y', 'ytd', 'max'
- `interval` (str): Data interval - '1m', '5m', '15m', '30m', '60m', '1d', '1wk', '1mo'

**Returns:**
- pd.DataFrame with columns: Open, High, Low, Close, Volume, Adj Close (prices in INR)
- None if error

**Examples:**
```python
# Fetch TCS from NSE (1 year daily data)
data = DataFetcher.fetch_yfinance("TCS.NS", period="1y", interval="1d")

# Fetch SBI from NSE (6 months daily data)
data = DataFetcher.fetch_yfinance("SBIN.NS", period="6mo", interval="1d")

# Fetch Infosys from BSE
data = DataFetcher.fetch_yfinance("INFY.BO", period="1y", interval="1d")

# Fetch Nifty 50 Index
data = DataFetcher.fetch_yfinance("^NSEI", period="6mo", interval="1d")
```

---

### fetch_and_save(symbol, source='yfinance', period='1y')
Fetch Indian stock data and save to database in one call (RECOMMENDED).

**Parameters:**
- `symbol` (str): Stock symbol with .NS or .BO suffix
- `source` (str): 'yfinance' (recommended for Indian stocks)
- `period` (str): Time period for yfinance

**Returns:**
- int: Number of records saved

**Examples:**
```python
from src.data_fetcher import DataFetcher
from src.database import init_db, close_db

init_db()

# Fetch major Indian IT stocks
records = DataFetcher.fetch_and_save("TCS.NS", source="yfinance", period="1y")
print(f"TCS: Saved {records} records")

records = DataFetcher.fetch_and_save("INFY.NS", source="yfinance", period="1y")
print(f"Infosys: Saved {records} records")

records = DataFetcher.fetch_and_save("WIPRO.NS", source="yfinance", period="1y")
print(f"Wipro: Saved {records} records")

close_db()
```

---

### save_stock_data_to_db(symbol, data)
Save DataFrame to database.

**Parameters:**
- `symbol` (str): Stock symbol (e.g., 'TCS.NS')
- `data` (pd.DataFrame): OHLCV data in INR

**Returns:**
- int: Number of records inserted

---

## Database Models

### Stock
```python
from src.models import Stock

# Create Indian stock record
Stock.create(symbol="TCS", name="Tata Consultancy Services", sector="Information Technology")
Stock.create(symbol="INFY", name="Infosys Limited", sector="Information Technology")
Stock.create(symbol="SBIN", name="State Bank of India", sector="Banking")

# Query
stock = Stock.get(Stock.symbol == "TCS")
print(f"{stock.symbol} - {stock.name}")
```

### StockPrice
```python
from src.models import StockPrice
from datetime import datetime, timedelta

# Query recent prices for TCS (in INR)
recent = StockPrice.select().where(
    StockPrice.stock == "TCS"
).order_by(StockPrice.date.desc()).limit(10)

for price in recent:
    print(f"{price.date.strftime('%Y-%m-%d')} - Close: ₹{price.close_price:.2f}")

# Get 30-day average closing price
start_date = datetime.now() - timedelta(days=30)
prices = StockPrice.select().where(
    (StockPrice.stock == "INFY") & 
    (StockPrice.date >= start_date)
)

if prices:
    avg_price = sum(p.close_price for p in prices) / len(prices)
    print(f"Infosys 30-day average: ₹{avg_price:.2f}")
```

---

## Utility Functions

### validate_symbol(symbol)
Validate and normalize stock symbol.
```python
from src.utils import validate_symbol

symbol = validate_symbol("tcs")  # Returns "TCS"
```

### calculate_returns(initial, final)
Calculate percentage returns.
```python
from src.utils import calculate_returns

# Investment of ₹10,000 grew to ₹15,000
returns = calculate_returns(10000, 15000)  # Returns 50.0%
print(f"Returns: {returns:.2f}%")
```

### format_currency(value, currency="INR")
Format as currency string.
```python
from src.utils import format_currency

price = format_currency(1500.50, currency="INR")  # Returns "₹1,500.50"
```

---

## Common Workflows

### Fetch and store multiple Indian stocks
```python
from src.database import init_db, close_db
from src.data_fetcher import DataFetcher

init_db()

# Major Indian IT stocks
it_stocks = ["TCS.NS", "INFY.NS", "WIPRO.NS", "HCL.NS", "TECHM.NS"]

# Major Indian Banking stocks
bank_stocks = ["SBIN.NS", "HDFC.NS", "ICICIBANK.NS", "AXISBANK.NS"]

all_stocks = it_stocks + bank_stocks

for symbol in all_stocks:
    records = DataFetcher.fetch_and_save(symbol, period="1y")
    print(f"{symbol}: {records} records saved")

close_db()
```

### Query price history for Indian stock
```python
from src.models import StockPrice
from datetime import datetime, timedelta

# Get all records for TCS from last 6 months
start_date = datetime.now() - timedelta(days=180)
prices = StockPrice.select().where(
    (StockPrice.stock == "TCS") & 
    (StockPrice.date >= start_date)
).order_by(StockPrice.date)

print(f"Found {len(prices)} trading days for TCS")
for price in prices[:5]:  # First 5 days
    print(f"{price.date} - O: ₹{price.open_price} H: ₹{price.high_price} L: ₹{price.low_price} C: ₹{price.close_price}")
```

### Calculate returns between two dates
```python
from src.models import StockPrice
from datetime import datetime
from src.utils import calculate_returns

# Get opening price on specific date (e.g., 1 year ago)
start_price_record = StockPrice.select().where(
    StockPrice.stock == "INFY"
).order_by(StockPrice.date).first()

# Get latest closing price
end_price_record = StockPrice.select().where(
    StockPrice.stock == "INFY"
).order_by(StockPrice.date.desc()).first()

if start_price_record and end_price_record:
    returns = calculate_returns(
        start_price_record.close_price,
        end_price_record.close_price
    )
    print(f"Infosys 1-year returns: {returns:.2f}%")
    print(f"Start price: ₹{start_price_record.close_price:.2f}")
    print(f"End price: ₹{end_price_record.close_price:.2f}")
```

### Find highest and lowest prices
```python
from src.models import StockPrice
from peewee import fn

# Get highest closing price for TCS
highest = StockPrice.select(fn.MAX(StockPrice.close_price)).where(
    StockPrice.stock == "TCS"
).scalar()

# Get lowest closing price for TCS
lowest = StockPrice.select(fn.MIN(StockPrice.close_price)).where(
    StockPrice.stock == "TCS"
).scalar()

print(f"TCS - Highest: ₹{highest:.2f}, Lowest: ₹{lowest:.2f}")
```

---

## Configuration

Settings available in `src/config.py`:

```python
from src.config import (
    DATABASE_PATH,
    MARKET_TIMEZONE,      # Asia/Kolkata (IST)
    MARKET_NAME,          # NSE/BSE (India)
    MARKET_OPEN_HOUR,     # 9 (AM)
    MARKET_CLOSE_HOUR,    # 16 (4 PM)
    EXCHANGES,            # NSE & BSE details
    INDICES               # Nifty 50, Sensex, etc.
)

print(f"Market: {MARKET_NAME}")
print(f"Timezone: {MARKET_TIMEZONE}")
print(f"Trading Hours: {MARKET_OPEN_HOUR}:15 - {MARKET_CLOSE_HOUR}:30 IST")
```

---

## Popular Indian Stock Symbols

### Large-cap IT Stocks
- TCS.NS - Tata Consultancy Services
- INFY.NS - Infosys Limited
- WIPRO.NS - Wipro Limited
- HCL.NS - HCL Technologies
- TECHM.NS - Tech Mahindra

### Large-cap Banking Stocks
- SBIN.NS - State Bank of India
- HDFC.NS - HDFC Bank
- ICICIBANK.NS - ICICI Bank
- AXISBANK.NS - Axis Bank
- KOTAKBANK.NS - Kotak Mahindra Bank

### Indices
- ^NSEI - Nifty 50
- ^BSESN - Sensex
- ^NSEBANK - Nifty Bank
- ^NSEINFRA - Nifty Infrastructure

---

## Error Handling

All functions include error handling with logging:

```python
import logging
from src.data_fetcher import DataFetcher

logger = logging.getLogger(__name__)

try:
    data = DataFetcher.fetch_yfinance("TCS.NS")
    if data is None:
        logger.warning("No data retrieved - check symbol format (use .NS or .BO)")
except Exception as e:
    logger.error(f"Fetch error: {e}")
```

---

**Happy Trading with Indian Stocks!** 📈🇮🇳
