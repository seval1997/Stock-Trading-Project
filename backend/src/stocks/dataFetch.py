import requests 
import pandas as pd
import certifi
from io import StringIO
from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf

app = Flask(__name__)
CORS(app)

@app.route("/nse-symbols")
def fetch_nse_symbols():
    # Official NSE equities list CSV
    url = "https://nsearchives.nseindia.com/content/equities/EQUITY_L.csv"
    headers = {"User-Agent": "Mozilla/5.0"}  # NSE blocks requests without UA
    response = requests.get(url, headers=headers, verify=certifi.where(), timeout=20)
    response.raise_for_status()
    # Load into pandas DataFrame
    data = StringIO(response.text)
    df = pd.read_csv(data)
    # Extract SYMBOL column
    symbols = df["SYMBOL"].dropna().tolist()
    print(f"Fetched {len(symbols)} symbols from NSE")
    return jsonify(symbols)

app.route("/get_stock_data_by_symbol")
def get_stock_data_by_symbol():
    symbol = request.args.get("symbol")
    interval = request.args.get("interval", "1d")
    period = request.args.get("period", "1mo")
    ticker = yf.Ticker(f"{symbol}")
    data = ticker.history(interval=interval, period=period)
    return jsonify({"symbol": symbol, "interval": interval, "period": period, "data": data.reset_index().to_dict("records")})

@app.route("/nifty50_dashboard_card")
def nifty50_dashboard_card():
    ticker = yf.Ticker("^NSEI")
    data = ticker.history(period="2d")
    jsonifyData = jsonify({"symbol": "^NSEI", "interval": "1d", "period": "2d", "data": data.reset_index().to_dict("records")})
    return jsonifyData

if __name__ == "__main__":
    get_stock_data_by_symbol()