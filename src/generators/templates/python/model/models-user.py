from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
from datetime import datetime
import os

Base = declarative_base()

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./users.db")
engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    name = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

def get_db():
    db = Session(engine)
    try:
        yield db
    finally:
        db.close()

