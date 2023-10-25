import { useState } from "react";

interface DeckFormProps {
  onSubmit: () => void;
}

export const DeckForm = (props: DeckFormProps) => {
  const [deckForm, setDeckForm] = useState<string>("");

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setDeckForm(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const deckUrl = `${import.meta.env.VITE_API_URL}/decks`;

    const decksData = {
      deckName: deckForm,
    };

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(decksData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const deckResponse = await fetch(deckUrl, fetchConfig);

      if (deckResponse.ok) {
        setDeckForm("");
        props.onSubmit();
      }
    } catch (e) {
      console.log("Error creating deck", e);
    }
  };

  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="deckName">Deck Name:</label>
            <input
              type="text"
              id="deckName"
              name="deckName"
              value={deckForm}
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
