from datetime import datetime
from pydantic import BaseModel


class CardBase(BaseModel):  # In
    deck_id: int
    question: str
    answer: str


class Card(CardBase):  # Out
    card_id: int
    datetime_created: datetime

    class Config:
        from_attributes = True


class DeckBase(BaseModel):  # In
    deck_name: str


class Deck(DeckBase):  # Out
    id: int
    datetime_created: datetime
    cards: list[Card] = []

    class Config:
        from_attributes = True
