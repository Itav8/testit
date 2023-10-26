import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export interface Cards {
  question: string;
  answer: string;
}

export const Test = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const deckId = pathName[pathName.length - 1];
  const [cards, setCards] = useState<Cards[]>([])

  const fetchDeck = async (deckId: number) => {
    const getDeckUrl = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;

    try {
      const deckResponse = await fetch(getDeckUrl);

      if (deckResponse.ok) {
        const deckData = await deckResponse.json();
        const cards = deckData.cards.map((card: Cards) => {
          return [card.question, card.answer]
        })
        setCards(cards);
      }
    } catch (error) {
      console.log("Error getting cards", error);
    }
  };

  useEffect(() => {
    fetchDeck(Number(deckId));
  }, [deckId]);

  console.log(cards)

  return (
    <>
      <div>
        <h1>Test</h1>
      </div>
    </>
  );
};
