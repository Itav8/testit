from datetime import datetime
from pydantic import BaseModel


class DeckBase(BaseModel):  # In
    deck_name: str


class Deck(DeckBase):  # Out
    id: int
    datetime_created: datetime

    class Config:
        from_attributes = True


class CardBase(BaseModel):  # In
    question: str
    answer: str


class Card(CardBase):  # Out
    id: int
    datetime_created: datetime

    class Config:
        from_attributes = True
