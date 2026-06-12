from flask import Flask, jsonify, request
from flask_cors import CORS
from src.db import users_collection

app = Flask(__name__)
CORS(app)

@app.route("/api/users/login", methods=["POST"])
def login():
    data = request.json
    username = data.get("username")
    password = data.get("password")
    user = users_collection.find_one({"username": username})
    if user:
        if password == user["password"]:
            return jsonify({"message": "Login successful"})
        else:
            return jsonify({"message": "Invalid Username or Password"})
    return jsonify({"message": "Invalid Username or Password"})