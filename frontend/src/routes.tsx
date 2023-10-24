import { createBrowserRouter } from "react-router-dom";
import { Decks } from "./pages/Decks/Decks";

export const routes = [
  {
    path: "/",
    element: <Decks />,
    name: "Decks",
  },
];

export const router = createBrowserRouter(routes);
