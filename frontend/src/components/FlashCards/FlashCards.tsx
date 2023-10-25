import "./FlashCards.css";

interface FlashCardInfoProps {
  question: string;
  answer: string;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const FlashCards = (props: FlashCardInfoProps) => {
  return (
    <>
      <div className="flashcard_container">
        <div className="flashcard">
          <h3>Question: {props.question}</h3>
        </div>
        <div className="flashcard">
          <h3>Answer: {props.answer}</h3>
        </div>
      </div>
    </>
  );
};
