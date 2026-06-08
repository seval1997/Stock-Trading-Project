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
    try:
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
    except Exception as e:
        print(f"Error fetching NSE symbols: {str(e)}")
        return jsonify({"error": "Failed to fetch NSE symbols"}), 500

@app.route("/get_stock_data_by_symbol")
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
    previousDay = data.iloc[-2]
    latestDay = data.iloc[-1]

    closingDiff = latestDay["Close"] - previousDay["Close"]
    closingPercentageChange = (closingDiff / previousDay["Close"]) * 100
    jsonifyData = jsonify({
        "symbol": "Nifty 50",
        "closingDiff": closingDiff,
        "closingPercentageChange": closingPercentageChange,
        "date": latestDay.name.strftime("%Y-%m-%d"),
        "data": latestDay.to_dict()
    })
    return jsonifyData

@app.route("/nifty50_detailed_view")
def nifty50_detailed_view():
    ticker = yf.Ticker("^NSEI")
    period = request.args.get("period")
    data = ticker.history(period=period, interval="1d")
    data.reset_index(inplace=True)
    data["Date"] = data["Date"].dt.strftime("%Y-%m-%d")
    print(f"Fetched {data}")
    return jsonify({
        "symbol": "Nifty 50",
        "data": data.to_dict("records")
    })

if __name__ == "__main__":
    get_stock_data_by_symbol()