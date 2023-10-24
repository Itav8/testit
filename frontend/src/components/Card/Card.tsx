import "./Card.css";

interface CardInfoProps {
  title?: string;
  children?: React.ReactNode;
  onClick?: () => void;
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
      </div>
    </>
  );
};
