from flask import Flask, request
from flask.json import jsonify
from flask_cors import CORS
from db import MongoConnection
from schema import User, Badge

app = Flask(__name__)
CORS(app)

@app.route("/badges", methods=["GET", "POST"])
def badgeList():
    if request.method == "GET":
        with MongoConnection() as conn:
            badges = conn.get_all_badges()
        categories = [badge["category"] for badge in badges]
        return jsonify({category: list(sorted([Badge.json(badge) for badge in badges if badge["category"] == category], key=lambda k:k["points"], reverse=True)) for category in categories})
    else:
        response = "{}"
        try:
            badge_json = request.get_json()
            print(badge_json)
            badge_json["points"] = int(badge_json["points"])
            new_badge: Badge = Badge(**badge_json)
            with MongoConnection() as conn:
                conn.create_badge(new_badge)
            response = jsonify({"status":"OK"})
            response.status_code = 200
        except:
            response = jsonify({"status": "FAIL"})
            response.status_code = 409
        return response