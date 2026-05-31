"""Flask backend entry point for Trading Project - Supports Stock & Crypto."""

from flask import Flask, jsonify, request
from backend.src.utils import setup_logging
from backend.src.crypto.data_fetcher import DataFetcher as CryptoDataFetcher
from backend.src.stocks.data_fetcher import DataFetcher as StockDataFetcher
import sqlite3

# Setup logging
logger = setup_logging()
app = Flask(__name__)

@app.route("/api/symbols", methods=["GET"])
def get_symbols():
    """Return all NSE symbols or search by query."""
    symbols = StockDataFetcher.get_nse_symbols()
    query = request.args.get("q", "").strip()

    if query:
        matches = StockDataFetcher.search_symbol(symbols, query)
        return jsonify(matches)
    return jsonify(symbols)

@app.route("/api/stock/<symbol>", methods=["GET"])
def get_stock_data(symbol):
    """Fetch stock data for a given symbol."""
    try:
        logger.info(f"Fetching data for {symbol}...")
        data = StockDataFetcher.fetch_yfinance(symbol, period="1y", interval="1d")

        if data is not None:
            logger.info(f"Successfully fetched {symbol}: {len(data)} records")
            # Convert DataFrame to JSON
            return data.reset_index().to_json(orient="records")
        else:
            logger.warning(f"No data retrieved for {symbol}")
            return jsonify({"error": "No data retrieved"}), 404

    except Exception as e:
        logger.error(f"Error in get_stock_data: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/crypto/<pair>", methods=["GET"])
def get_crypto_data(pair):
    """Fetch live crypto data (Binance via CCXT)."""
    try:
        df = CryptoDataFetcher(exchange_name="binance")
        df.fetch_crypto_price(symbol=pair, interval=1, duration=10)
        return jsonify({"status": "Fetching crypto data", "pair": pair})
    except Exception as e:
        logger.error(f"Error in get_crypto_data: {e}")
        return jsonify({"error": str(e)}), 500

@app.route("/")
def home():
    return "Trading Project Backend is running!"


if __name__ == "__main__":
    app.run(debug=True)
