import { createBrowserRouter } from "react-router-dom";
import { Decks } from "./pages/Decks/Decks";
import { Cards } from "./pages/Cards/Cards";
import { Test } from "./pages/Test/Test";

export const routes = [
  {
    path: "/",
    element: <Decks />,
    name: "Decks",
  },
  {
    path: "/deck/:id",
    element: <Cards />,
    name: "Cards",
  },
  {
    path: "/test/deck/:id",
    element: <Test />,
    name: "Test",
  },
];

export const router = createBrowserRouter(routes);
