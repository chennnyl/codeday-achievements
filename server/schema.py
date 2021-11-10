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
    badges: List[BadgeName]

    def dict(self):
        return {"name": self.name, "badges": self.badges}
