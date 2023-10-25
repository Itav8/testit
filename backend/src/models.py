from sqlalchemy import (
    Column,
    DateTime,
    ForeignKey,
    Integer,
    PrimaryKeyConstraint,
    String,
)
from sqlalchemy.sql import func
from db import Base


class Deck(Base):
    __tablename__ = "decks"
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, nullable=False)
    deck_name = Column(String, nullable=False)
    datetime_created = Column(DateTime, server_default=func.now())


class Card(Base):
    __tablename__ = "cards"
    __allow_unmapped__ = True

    id = Column(Integer, primary_key=True, nullable=False)
    question = Column(String, nullable=False)
    answer = Column(String, nullable=False)
    datetime_created = Column(DateTime, server_default=func.now())


class CardToDeck(Base):
    __tablename__ = "cards_to_decks"
    __table_args__ = (
        PrimaryKeyConstraint("card_id", "deck_id", name="card_to_deck_pk"),
    )
    card_id = Column(Integer, ForeignKey("cards.id"), nullable=False)
    deck_id = Column(Integer, ForeignKey("decks.id"), nullable=False)
