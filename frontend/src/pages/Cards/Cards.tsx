import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FlashCards } from "../../components/FlashCards/FlashCards";
import { CardsForm } from "./CardsForm";
import { Modal } from "../../components/Modal/Modal";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

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

  const handleClick = () => {
    navigate(`/test/deck/${deckId}`);
  };

  return (
    <>
      <div>
        <h1>{deck.deck_name}</h1>
      </div>
      <div className="card_create__button">
        <button onClick={() => setIsModalOpen(true)}>+ Create</button>
        {isModalOpen ? (
          <Modal
            open={isModalOpen}
            onClose={() => {
              fetchDeck(Number(deckId));
              setIsModalOpen(false);
            }}
          >
            <CardsForm
              deckId={Number(deckId)}
              onSubmit={() => {
                fetchDeck(Number(deckId));
                setIsModalOpen(false);
              }}
            />
          </Modal>
        ) : null}
      </div>
      <div>
        <button onClick={handleClick}>Test</button>
      </div>
      <div>
        {cards.map((card, i) => (
          <FlashCards key={i} question={card.question} answer={card.answer} />
        ))}
      </div>
    </>
  );
};
