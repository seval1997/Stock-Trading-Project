from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from src.db import users_collection

app = Flask(__name__)
CORS(app)

@app.route("/api/users/signup", methods=["POST"])
def signup():
    data = request.json
    print(f"data = {data}")
    user = {
        "username": data.get("username"),
        "email": data.get("email"),
        "password": data.get("password")  # In production, hash the password!
    }
    users_collection.insert_one(user)
    return jsonify({"message": "User registered successfully"})


