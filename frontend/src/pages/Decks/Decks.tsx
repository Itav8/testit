import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { Modal } from "../../components/Modal/Modal";
import { DeckForm } from "./DeckForm";

import "./Decks.css";

export interface Deck {
  deckId?: number;
  deckName: string;
  dateTimeCreated?: string;
}

export interface DeckData {
  id: number;
  deck_name: string;
  datetime_created: string;
}

export const Decks = () => {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDecks = async () => {
      const getDecksUrl = `${import.meta.env.VITE_API_URL}/decks`;
      try {
        const decksResponse = await fetch(getDecksUrl);

        if (decksResponse.ok) {
          const decksData = await decksResponse.json();
          const updatedDeck = decksData.map((deck: DeckData) => {
            return {
              deckId: deck.id,
              deckName: deck.deck_name,
              dateTimeCreated: deck.datetime_created,
            };
          });

          setDecks(updatedDeck);
        }
      } catch (e) {
        console.log("Error getting list of decks", e);
      }
    };
    fetchDecks();
  }, [decks]);

  return (
    <>
      <h1 className="title">My Decks</h1>
      <div className="deck_container">
        {decks.map((deck, i) => (
          <Card key={i} title={deck.deckName} />
        ))}
      </div>
      <div className="deck_create__button">
        <button onClick={() => setIsModalOpen(true)}>+ Create</button>
        {isModalOpen ? (
          <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <DeckForm onSubmit={() => setIsModalOpen(false)} />
          </Modal>
        ) : null}
      </div>
    </>
  );
};
