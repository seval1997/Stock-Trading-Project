import pandas as pd
import yfinance as yf

# 1. Initialize the Ticker object
asian_paints = yf.Ticker("ASIANPAINT.NS")

print("--- 1. HISTORICAL PRICE DATA (LAST 5 DAYS) ---")
# Fetches historical OHLCV data into a pandas DataFrame
history_df = asian_paints.history(period="5d")
print(history_df)
print(history_df[["Open", "High", "Low", "Close", "Volume"]])
print("\n" + "=" * 50 + "\n")


print("--- 2. REAL-TIME QUOTES & METRICS ---")
info = asian_paints.info
# Use .get() to avoid KeyErrors if Yahoo Finance has missing fields
print(f"Current Price: ₹{info.get('regularMarketPrice')}")
print(f"52-Week High:  ₹{info.get('fiftyTwoWeekHigh')}")
print(f"52-Week Low:   ₹{info.get('fiftyTwoWeekLow')}")
print(f"Market Cap:    ₹{info.get('marketCap'):,}")
print("\n" + "=" * 50 + "\n")


print("--- 3. FUNDAMENTAL RATIOS ---")
print(f"Trailing P/E:  {info.get('trailingPE')}")
print(f"Price to Book: {info.get('priceToBook')}")
print(f"Trailing EPS:  ₹{info.get('trailingEps')}")
print(f"Profit Margin: {info.get('profitMargins') * 100:.2f}%" if info.get('profitMargins') else "N/A")
print("\n" + "=" * 50 + "\n")


print("--- 4. CORPORATE ACTIONS (RECENT 5 ENTRIES) ---")
# Returns a DataFrame tracking dividends and splits
actions_df = asian_paints.actions
print(actions_df.tail(5))
print("\n" + "=" * 50 + "\n")


print("--- 5. FINANCIAL STATEMENTS ---")
# Annual Income Statement (transpose for easier horizontal reading)
income_statement = asian_paints.income_stmt
print("Annual Income Statement (Top Rows):")
print(income_statement.head(5))

print("\nAnnual Balance Sheet (Top Rows):")
balance_sheet = asian_paints.balance_sheet
print(balance_sheet.head(5))
