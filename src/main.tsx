import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Index, { loader as rootLoader } from "./routes/index";
import ErrorPage from "./routes/error";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
