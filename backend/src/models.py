from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from db import Base


class Deck(Base):
    __tablename__ = "decks"

    id = Column(Integer, primary_key=True)
    deck_name: Column(String)
    datetime_created: Column(DateTime)

    cards = relationship("Card", back_populates="deck")


class Card(Base):
    __tablename__ = "cards"

    id = Column(Integer, primary_key=True)
    question = Column(String)
    answer = Column(String)

    deck = relationship("Deck", back_populates="cards")


class CardToDeck(Base):
    __tablename__ = "cards_to_decks"

    card_id = Column(Integer, ForeignKey("card.id"))
    deck_id = Column(Integer, ForeignKey("deck.id"))
