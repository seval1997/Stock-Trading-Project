from flask import Flask, jsonify, request
from flask_cors import CORS
import yfinance as yf
from src.db import users_collection, watchList_collection
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/addStockWatchList", methods=["POST"])
def addStockIntoWatchList():
    data = request.json
    username = data.get("username")
    symbol = data.get("symbol")
    if userExist(username):
        stock_watchList = {
            "username": username,
            "watchlist" : [
                {
                    "symbol" : symbol,
                    "addedOn" : datetime.utcnow().isoformat()
                }
            ],
            "createdOn" : datetime.utcnow().isoformat()
        }
        watchList_collection.insert_one(stock_watchList)
    else:
        watchList_collection.update_one({"username": username},
                                        {
                                            "$addToSet" : {
                                                "watchlist": {
                                                    "symbol" : symbol,
                                                    "addedOn" : datetime.utcnow().isoformat()
                                                }
                                            }
                                        })
    return jsonify({"message" : "{symbol} added successfully"})

@app.route("/removeStockWatchList", methods=["POST"])
def removeStockFromWatchList():
    data = request.json
    username = data.get("username")
    symbol = data.get("symbol")
    stock_watchlist = watchList_collection.update_one(
        {"username": username},
        {
            "$pull" : {
             "watchlist" : {"symbol" : symbol}
            }
        }
    )
    if stock_watchlist.modified_count > 0:
        return jsonify({"message": "{symbol} removed successfully"})
    else:
        return jsonify({"message": "{symbol} not present in the watchlist"})

def userExist(username: str) ->bool:
    user = watchList_collection.find_one({"usermame": username})
    return bool (user)