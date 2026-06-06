from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "This is first API endpoint! for Stock Trading App!"})

@app.route("/api/stocks")
def get_stocks():
    return jsonify([
        {"symbol": "TCS", "price": 3450},
        {"symbol": "INFY", "price": 1520},
        {"symbol": "HDFCBANK", "price": 1650}
    ])

if __name__ == "__main__":
    app.run(debug=True)