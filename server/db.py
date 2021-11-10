from typing import Any, Dict, List, Union
from pymongo import MongoClient
from pymongo.results import InsertOneResult
from schema import Badge, User

DBNAME = "achievements"
USERCOL = "users"
BADGECOL = "badges"

UserFields = Dict[str, Union[str, int]]
BadgeFields = UserFields
ResultFilter = Dict[str, int]

class MongoCursor(MongoClient):
    def get_user(self, query_filter : UserFields = None, result_filter : ResultFilter = None) -> User:
        result : UserFields = self[DBNAME][USERCOL].find_one(query_filter)
        return User(**result)
    def get_badge(self, query_filter : BadgeFields = None, result_filter: ResultFilter = None) -> Badge:
        result : BadgeFields = self[DBNAME][BADGECOL].find_one(query_filter)
        return Badge(**result)

    def get_all_users(self, result_filter: ResultFilter = None) -> List[User]:
        result : List[UserFields] = [user for user in self[DBNAME][USERCOL].find({}, result_filter)]
        return result

    def get_all_badges(self, result_filter: ResultFilter = None) -> List[Badge]:
        result : List[BadgeFields] = [user for user in self[DBNAME][BADGECOL].find({}, result_filter)]
        return result
    
    def create_user(self, user : User) -> InsertOneResult:
        return self[DBNAME][USERCOL].replace_one({"name": user.name}, user.dict(), upsert=True)

    def create_badge(self, badge : Badge) -> InsertOneResult:
        return self[DBNAME][BADGECOL].replace_one({"name": badge.name}, badge.dict(), upsert=True)

class MongoConnection:
    def __init__(self, *args, **kwargs):
        self.client : MongoCursor = None
        self.ckwargs : Dict[Any] = kwargs
        self.cargs : List[Any] = args
    def __enter__(self) -> MongoCursor:
        self.client = MongoCursor("mongodb://localhost:27017/", *self.cargs, **self.ckwargs)
        return self.client
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.client.close()
    