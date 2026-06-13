from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from src.db import users_collection, usersProfile_collection

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

@app.route("/api/users/addUserProfile", methods=["POST"])
def addUserProfile():
    data = request.json
    user = {
        "name": data.get("name"),
        "mobile": data.get("mobile"),
        "dob": data.get("dob"),
        "username": data.get("username")
    }
    print(f"Update {data}")

    # ✅ Call with argument
    if userProfileExist(data.get("username")):
        usersProfile_collection.update_one(
            {"username": data.get("username")},
            {"$set": user}
        )
        return jsonify({"message": "User profile updated successfully"}), 200
    else:
        print("user does not exist")
        usersProfile_collection.insert_one(user)
        return jsonify({"message": "User profile inserted successfully"}), 201


def userProfileExist(username):
    user = usersProfile_collection.find_one({"username": username})
    return bool(user)
