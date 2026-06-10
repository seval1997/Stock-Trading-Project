# Connect to local MongoDB
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["myappdb"]
users_collection = db["users"]