import { useLocation } from "react-router-dom"

export const Cards = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const deckId = pathName[pathName.length - 1]
  
  return (
    <>
      <div>DECK NAME</div>
    </>
  );
}
