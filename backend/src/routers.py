from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
import schemas
import crud


router = APIRouter()


@router.post("/deck/create", response_model=schemas.Deck)
def create_deck(deck_name: schemas.DeckBase, db: Session = Depends(get_db)):
    print("ROUTER", deck_name)
    new_deck = crud.create_deck(db, deck_name)

    if new_deck is None:
        return HTTPException(status_code=404, detail="Unable to create deck")
    return new_deck
