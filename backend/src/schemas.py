from pydantic import BaseModel


class DeckBase(BaseModel):
    name: str
