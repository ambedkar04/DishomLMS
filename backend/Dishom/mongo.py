import os
from typing import Optional

from pymongo import MongoClient


_client: Optional[MongoClient] = None
_db = None


def get_mongo_client() -> MongoClient:
    global _client
    if _client is None:
        mongo_uri = os.getenv("MONGO_URI")
        if not mongo_uri:
            user = os.getenv("DATABASE_USER")
            pwd = os.getenv("DATABASE_PASSWORD")
            host = os.getenv("DATABASE_HOST", "localhost")
            port = os.getenv("DATABASE_PORT", "27017")
            mongo_uri = f"mongodb://{user}:{pwd}@{host}:{port}"
        _client = MongoClient(mongo_uri)
    return _client


def get_mongo_db():
    global _db
    if _db is None:
        # Prefer DATABASE_NAME from env; if not set, try to parse from URI path; fallback to 'test'
        name = os.getenv("DATABASE_NAME") or "test"
        _db = get_mongo_client()[name]
    return _db
