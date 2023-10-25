import { useState } from "react";

export interface CardsForm {
  question: string;
  answer: string;
}

export interface CardsFormProps {
  deckId: number;
  onSubmit: () => void;
}

export const CardsForm = (props: CardsFormProps) => {
  const [cardForm, setCardForm] = useState<CardsForm>({
    question: "",
    answer: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const inputName = event.target.name;

    setCardForm({ ...cardForm, [inputName]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const cardUrl = `${import.meta.env.VITE_API_URL}/cards`;

    const cardsData = {
      deck_id: props.deckId,
      question: cardForm.question,
      answer: cardForm.answer,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(cardsData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const cardResponse = await fetch(cardUrl, fetchConfig);

      if (cardResponse.ok) {
        setCardForm({ question: "", answer: "" });
        props.onSubmit();
      }
    } catch (e) {
      console.log("Error creating card", e);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              name="question"
              value={cardForm.question}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label htmlFor="answer">Answer:</label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={cardForm.answer}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </>
  );
};
