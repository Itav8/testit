import { useLocation } from "react-router-dom"

export const Cards = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const deckName = pathName[pathName.length - 1]

  return (
    <>
      <div>
        <h1>{deckName}</h1>
      </div>
    </>
  );
}
