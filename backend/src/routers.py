from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from db import get_db
import schemas
import crud


router = APIRouter()


# DECK
@router.post("/decks", response_model=schemas.Deck)
def created_deck(deck_name: schemas.DeckBase, db: Session = Depends(get_db)):
    new_deck = crud.create_deck(db, deck_name)

    if new_deck is Exception:
        return HTTPException(status_code=404, detail="Unable to create deck")
    return new_deck


@router.get("/decks", response_model=list[schemas.Deck])
def get_decks(db: Session = Depends(get_db)):
    decks = crud.get_list_of_decks(db)

    if decks is Exception:
        return HTTPException(status_code=404, detail="Unable to find decks")
    return decks


@router.get("/decks/{deck_id}", response_model=schemas.Deck)
def get_deck(deck_id: int, db: Session = Depends(get_db)):
    deck = crud.get_deck(db, deck_id)

    if deck is Exception:
        return HTTPException(status_code=404, detail="Unable to find deck")
    return deck


@router.put("/decks/{deck_id}", response_model=schemas.Deck)
def updated_deck(deck_id: int, deck: schemas.DeckBase, db: Session = Depends(get_db)):
    updated_deck = crud.update_deck(db, deck_id, deck)

    if updated_deck is Exception:
        return HTTPException(status_code=404, detail="Unable to find deck")
    return updated_deck


@router.delete("/decks/{deck_id}", response_model={})
def deleted_deck(deck_id: int, db: Session = Depends(get_db)):
    deleted_deck = crud.delete_deck(db, deck_id)

    if deleted_deck is Exception:
        return HTTPException(status_code=404, detail="Unable to find deck")
    return {"Deck deleted Successfully"}


# CARDS
@router.post("/cards", response_model=schemas.Card)
def created_card(card: schemas.CardBase, db: Session = Depends(get_db)):
    new_card = crud.create_card(db, card)

    if new_card is Exception:
        return HTTPException(status_code=404, detail="Unable to create card")
    return new_card


@router.get("/cards", response_model=list[schemas.Card])
def get_cards(db: Session = Depends(get_db)):
    cards = crud.get_list_of_cards(db)

    if cards is Exception:
        return HTTPException(status_code=404, detail="Unable to find cards")
    return cards


@router.delete("/cards/{card_id}", response_model={})
def deleted_card(card_id: int, db: Session = Depends(get_db)):
    deleted_card = crud.delete_card(db, card_id)

    if deleted_card is Exception:
        return HTTPException(status_code=404, detail="Unable to find card")
    return {"Card deleted Successfully"}
