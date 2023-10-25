import "./Card.css";

interface CardInfoProps {
  title?: string;
  children?: React.ReactNode;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Card = (props: CardInfoProps) => {
  return (
    <>
      <div className="card">
        <div className="card_content">
          <div className="card_title">
            {props.title ? (
              <h2 className="card__title">{props.title}</h2>
            ) : null}
          </div>
        </div>
        <div className="card__footer">
          <button onClick={props.onDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};
