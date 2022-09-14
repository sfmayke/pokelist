import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/common";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "pokemon/:id",
        element: <Pokemon />,
        loader: async ({ params }) => {
          try {
            const response = await (
              await fetch(
                `https://api.pokemontcg.io/v2/cards/${params.id as string}`
              )
            ).json();
            return response.error.code === 404 ? redirect("/") : response;
          } catch (error) {
            redirect("/");
          }
        },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
