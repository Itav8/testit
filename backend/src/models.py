from sqlalchemy import Column, DateTime, Integer, String
from db import Base


class Deck(Base):
    __tablename__ = "decks"

    id = Column(Integer, primary_key=True)
    deck_name: Column(String)
    datetime_created: Column(DateTime)


class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True)
    question = Column(String)
    answer = Column(String)
