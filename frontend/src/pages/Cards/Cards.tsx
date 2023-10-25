import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FlashCards } from "../../components/FlashCards/FlashCards";

export interface DeckOfCards {
  id: number;
  deck_name: string;
  datetime_created?: string;
  cards: Array<string | number>;
}

export interface Cards {
  question: string;
  answer: string;
}

export const Cards = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const deckId = pathName[pathName.length - 1];
  const [deck, setDeck] = useState<DeckOfCards[]>([]);
  const [cards, setCards] = useState<Cards[]>([]);

  const fetchDeck = async (deckId: number) => {
    const getDeckUrl = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;

    try {
      const deckResponse = await fetch(getDeckUrl);

      if (deckResponse.ok) {
        const deckData = await deckResponse.json();
        setDeck(deckData);
        setCards(deckData.cards);
      }
    } catch (error) {
      console.log("Error getting deck", error);
    }
  };

  useEffect(() => {
    fetchDeck(Number(deckId));
  }, [deckId]);

  return (
    <>
      <div>
        <h1>{deck.deck_name}</h1>
      </div>
      <div>
        {cards.map((card, i) => (
          <FlashCards
            key={i}
            question={card.question}
            answer={card.answer}
          />
        ))}
      </div>
    </>
  );
};
