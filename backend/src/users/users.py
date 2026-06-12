from flask import Flask, jsonify, request
from flask_cors import CORS
from src.db import users_collection

app = Flask(__name__)
CORS(app)

@app.route("/api/users/userData")
def userData():
    username = request.args.get("username")
    user = users_collection.find_one({"username": username})
    print(f"user = {user}")
    if user:
        user_data = {
            "id": str(user["_id"]),       # convert ObjectId to string
            "username": user["username"],
            "email": user["email"]
        }
        return jsonify(user_data)

    return jsonify({"message": "No user data found"})