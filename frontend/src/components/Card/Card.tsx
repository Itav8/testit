import { NavLink } from "react-router-dom";
import "./Card.css";

interface CardInfoProps {
  title?: string;
  children?: React.ReactNode;
  onDelete?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  to?: string
}

export const Card = (props: CardInfoProps) => {
  return (
    <>
      <div className="card">
        <div className="card_content">
          <NavLink to={props.to ?? ""}>
            <div className="card_title">
              {props.title ? (
                <h2 className="card__title">{props.title}</h2>
              ) : null}
            </div>
          </NavLink>
          <h3>{props.children}</h3>
        </div>
        <div className="card__footer">
          <button onClick={props.onDelete}>Delete</button>
        </div>
      </div>
    </>
  );
};
