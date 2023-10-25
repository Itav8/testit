import { createBrowserRouter } from "react-router-dom";
import { Decks } from "./pages/Decks/Decks";
import { Cards } from "./pages/Cards/Cards";

export const routes = [
  {
    path: "/",
    element: <Decks />,
    name: "Decks",
  },
  {
    path: "/deck/:name",
    element: <Cards />,
    name: "Cards",
  },
];

export const router = createBrowserRouter(routes);
