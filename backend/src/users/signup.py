from flask import Flask, jsonify, request, Blueprint
from flask_cors import CORS
from src.db import users_collection, usersProfile_collection
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route("/api/users/signup", methods=["POST"])
def signup():
    data = request.json
    print(f"data = {data}")
    user = {
        "username": data.get("username"),
        "email": data.get("email"),
        "password": data.get("password"),  # In production, hash the password!
        "active" : True
    }
    user["createdOn"] = datetime.utcnow()
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
    
    if userExist(data.get("username")):
        user["updatedOn"] = datetime.utcnow()
        if(userProfileExist(data.get("username"))):
            usersProfile_collection.update_one(
                {"username": data.get("username")},
                {"$set": user}
            )
            return jsonify({"message" : "user profile updated successfully."})
        else:
            user["createdOn"] = datetime.utcnow()
            usersProfile_collection.insert_one(user)
            return jsonify({"message" : "uer profile created successfully."})
    return jsonify({"message": "user account doesn't exist."})
            
def userProfileExist(username):
    user = usersProfile_collection.find_one({"username": username})
    if user:
        return True
    else:
        return False

def userExist(username):
    user = users_collection.find_one({"username": username})
    if user and user["active"]:
        return True
    else:
        return False