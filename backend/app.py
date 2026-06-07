from flask import Flask, jsonify
from flask_cors import CORS
from src.stocks.dataFetch import fetch_nse_symbols, get_stock_data_by_symbol

app = Flask(__name__)
CORS(app)

app.add_url_rule("/api/stocks/nse-symbols", view_func=fetch_nse_symbols) 
app.add_url_rule("/api/stocks/get_stock_data_by_symbol", view_func=get_stock_data_by_symbol)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "This is first API endpoint! for Stock Trading App!"})


if __name__ == "__main__":
    app.run(debug=True)