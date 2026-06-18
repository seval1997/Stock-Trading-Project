# Connect to local MongoDB
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["myappdb"]
users_collection = db["user_accounts"]
usersProfile_collection = db["user_profiles"]
watchList_collection = db["stock_watchlists"]