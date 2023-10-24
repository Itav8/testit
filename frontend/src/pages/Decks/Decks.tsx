import { useEffect, useState } from "react";

export interface Deck {
  deckId?: number;
  deckName: string;
  datetimeCreated?: string;
}

export const Decks = () => {
  const [decks, seetDecks] = useState<Deck[]>([]);

  // useEffect(() => {
  const fetchDecks = async () => {
    const getDecksUrl = `${import.meta.env.VITE_API_URL}/decks`;

    try {
      const decksResponse = await fetch(getDecksUrl);

      if (decksResponse.ok) {
        const decksData = await decksResponse.json();
        console.log("INSE", decksData);
        seetDecks(decksData);
      }
    } catch (e) {
      console.log("Error getting list of decks", e);
    }
  };
  fetchDecks();
  // }, []);

  console.log("DECJS", decks);
  return (
    <div>
      <h1 className="title">My Decks</h1>
    </div>
  );
};
