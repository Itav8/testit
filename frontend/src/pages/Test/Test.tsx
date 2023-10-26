import { useLocation } from "react-router-dom";

export const Test = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/");
  const deckId = pathName[pathName.length - 1];
  console.log("deckId", deckId)
  return (
    <>
      <div>
        <h1>Test</h1>
      </div>
    </>
  );
};
