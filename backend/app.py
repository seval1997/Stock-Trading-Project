from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/api/hello")
def hello():
    return jsonify({"message": "This is first API endpoint! for Stock Trading App!"})

if __name__ == "__main__":
    app.run(debug=True)