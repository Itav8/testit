from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db import Base


class Deck(Base):
    __tablename__ = "decks"

    id = Column(Integer, primary_key=True, nullable=False)
    deck_name = Column(String, nullable=False)
    datetime_created = Column(DateTime, server_default=func.now())

    cards = relationship("Card", back_populates="deck")


class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True, nullable=False)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    datetime_created = Column(DateTime, server_default=func.now())
    deck_id = Column(Integer, ForeignKey("decks.id"))

    deck = relationship("Deck", back_populates="cards")
