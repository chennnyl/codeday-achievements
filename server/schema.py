from dataclasses import dataclass
from typing import List

@dataclass
class Badge:
    name: str
    points: int
    description: str
    category: str

    @staticmethod
    def json(badge):
        return {"name": badge["name"], "points": badge["points"], "description": badge["description"], "category": badge["category"]}

    def dict(self):
        return {"name": self.name, "points": self.points, "description": self.description, "category": self.category}

BadgeName = str

@dataclass
class User:
    name: str
    email: str
    badges: List[BadgeName]
    
    @staticmethod
    def json(user):
        return {"name": user["name"], "email": user["email"], "badges": user["badges"]}

    def dict(self):
        return {"name": self.name, "email": self.email, "badges": self.badges}
