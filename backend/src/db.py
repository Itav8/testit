import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()
SQLALCHEMY_DATABASE_URL = os.environ["DATABASE_URL"]

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
print("ENGINE", Base)


def test_connection():
    conn = engine.connect()
    conn.close()


def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception:
        print("Failed to connect to db")
    finally:
        db.close()


test_connection()
