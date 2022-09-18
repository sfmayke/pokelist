import ReactDOM from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import PokemonDetail from "./pages/PokemonDetail";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/common";
import { Provider } from 'react-redux';
import { store } from './redux/store';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "pokemon/:id",
    element: <PokemonDetail />,
    loader: async ({ params }) => {
      let response;
      try {
        response = await (
          await fetch(
            `https://api.pokemontcg.io/v2/cards/${params.id as string}`
          )
        ).json();

        if(response.error.code === 404)
          redirect("/")

      } catch (error) {
        redirect("/");
      }

      return response;
    },
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
    <Provider store={store }>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
