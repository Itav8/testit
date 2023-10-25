from sqlalchemy.orm import Session
import models
import schemas


# DECK
def create_deck(db: Session, deck_name: schemas.DeckBase):
    try:
        new_deck = models.Deck(**deck_name.model_dump())
        db.add(new_deck)
        db.commit()
        db.refresh(new_deck)
        return new_deck
    except Exception as e:
        raise e


def get_list_of_decks(db: Session):
    try:
        decks = db.query(models.Deck)

        if decks:
            return decks
        return {"Message": "Deck list is empty"}
    except Exception as e:
        raise e


def get_deck(db: Session, deck_id: int):
    try:
        deck = db.query(models.Deck).get(deck_id)

        if deck:
            return deck
        return {"Message": "Deck not found"}
    except Exception as e:
        raise e


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
        raise e


def delete_deck(db: Session, deck_id: int):
    try:
        current_deck = db.query(models.Deck).get(deck_id)
        if current_deck:
            db.delete(current_deck)
            db.commit()
            return {"Message": "Deck deleted successfully"}
        return {"Message": "Deck not found"}
    except Exception as e:
        raise e


# CARDS
def create_card(db: Session, card: schemas.CardBase):
    try:
        new_card = models.Card(**card.model_dump())
        db.add(new_card)
        db.commit()
        db.refresh(new_card)

        return new_card
    except Exception as e:
        raise e


def delete_card(db: Session, card_id: int):
    try:
        current_card = db.query(models.Card).get(card_id)
        if current_card:
            db.delete(current_card)
            db.commit()
            return {"Message": "Card deleted successfully"}
        return {"Message": "Card not found"}
    except Exception as e:
        raise e
