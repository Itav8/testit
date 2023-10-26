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
  const [cards, setCards] = useState<Cards[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const fetchDeck = async (deckId: number) => {
    const getDeckUrl = `${import.meta.env.VITE_API_URL}/decks/${deckId}`;

    try {
      const deckResponse = await fetch(getDeckUrl);

      if (deckResponse.ok) {
        const deckData = await deckResponse.json();
        const cards = deckData.cards.reduce((accum, current) => {
          if (!(current.question in accum) && !(current.answer in accum)) {
            accum.push({ question: current.question, answer: current.answer });
          }
          return accum;
        }, []);

        const shuffled = suffleCards(cards);
        setCards(shuffled);
      }
    } catch (error) {
      console.log("Error getting cards", error);
    }
  };

  useEffect(() => {
    fetchDeck(Number(deckId));
  }, [deckId]);

  const suffleCards = (cards: Cards[]) => {
    const newCards = [...cards];

    for (let i = newCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = newCards[i];
      newCards[i] = newCards[j];
      newCards[j] = temp;
    }

    return newCards;
  };

  const flipCard = () => {
    setShowAnswer(true);
  };

  const nextCard = () => {
    const currentCards = [...cards];
    const removed = currentCards.shift() as Cards;
    currentCards.push(removed);
    setCards(currentCards);
    setShowAnswer(false);
  };
  
  return (
    <>
      <div>
        <h1>Test</h1>
        {cards.map((card, i) => {
          return (
            <div key={i}>
              {i === 0 && !showAnswer ? (
                <h1 onClick={flipCard}>Question: {card.question}</h1>
              ) : null}
              {showAnswer && i === 0 ? (
                <h1 onClick={nextCard}>Answer: {card.answer}</h1>
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};
