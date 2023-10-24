from sqlalchemy.orm import Session
import models
import schemas


def create_deck(db: Session, deck_name: schemas.DeckBase):
    try:
        print("INSIDE", deck_name)
        new_deck = models.Deck(**deck_name.model_dump())
        db.add(new_deck)
        db.commit()
        db.refresh(new_deck)
        return new_deck
    except Exception as e:
        return {"Error": f"{e}"}


def get_list_of_decks(db: Session):
    try:
        decks = db.query(models.Deck)

        if decks:
            return decks
        return {"Message": "Deck list is empty"}
    except Exception as e:
        return {"Error": f"{e}"}


def update_deck(db: Session, deck_id: int, deck: schemas.DeckBase):
    try:
        current_deck: models.Deck = db.query(models.Deck).get(deck_id)

        if current_deck:
            current_deck.deck_name = deck.deck_name
            db.commit()
            db.refresh(current_deck)
            return current_deck
        return {"Message": "Deck not found"}
    except Exception as e:
        return {"Error": f"{e}"}


def delete_deck(db: Session, deck_id: int):
    try:
        current_deck = db.query(models.Deck).get(deck_id)

        if current_deck:
            db.delete(current_deck)
            db.commit()
            return {"Message": "Deck deleted successfully"}
        return {"Message": "Deck not found"}
    except Exception as e:
        return {"Error": f"{e}"}
