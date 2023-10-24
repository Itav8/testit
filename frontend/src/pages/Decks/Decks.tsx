import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchDecks = async () => {
      const getDecksUrl = `${import.meta.env.VITE_API_URL}/decks`;
      try {
        const decksResponse = await fetch(getDecksUrl);

        if (decksResponse.ok) {
          const decksData = await decksResponse.json();
          console.log("INSE", decksData);

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
  }, []);

  return (
    <div>
      <h1 className="title">My Decks</h1>
      {decks.map((deck, i) => {
        return <h2 key={i}>{deck.deckName}</h2>;
      })}
    </div>
  );
};
