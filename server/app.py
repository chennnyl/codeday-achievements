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

@app.route("/users", methods=["GET", "POST"])
def userList():
    response = "{}"
    if request.method == "GET":
        with MongoConnection() as conn:
            users = conn.get_all_users()
        response = jsonify([User.json(user) for user in users])
    else:
        try:
            user_json = request.get_json()
            new_user: User = User(**user_json, badges=[])
            with MongoConnection() as conn:
                conn.create_user(new_user)
            response = jsonify({"status":"OK"})
            response.status_code = 200
        except Exception as e:
            print(e)
            response = jsonify({"status":"FAIL"})
            response.status_code = 409

    return response

@app.route("/users/badges", methods=["POST"])
def userBadgeList():
    response = "{}"
    try:
        user_json = request.get_json()
        with MongoConnection() as conn:
            user_badges = conn.get_badges_from_user(user_json["name"])
        response = jsonify(user_badges)
        response.status_code = 200
    except Exception as e:
        print(e)
        response = jsonify([])
        response.status_code = 409
    return response

@app.route("/badges/add", methods=["POST"])
def addBadge():
    response = "{}"
    try:
        request_json = request.get_json()
        with MongoConnection() as conn:
            conn.add_badge(request_json["user"], request_json["badge"])
        response = jsonify({"status":"OK"})
        response.status_code = 200
    except Exception as e:
        print(e)
        response = jsonify({"status": "FAIL"})
        response.status_code = 409
    return response
