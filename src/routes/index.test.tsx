import { cleanup, render, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import Index from "./index";

test("initial page load with search bar", async () => {
  const routes = [
    {
      path: "/",
      element: <Index />,
      loader: () => ({
        q: null,
        searchResults: [],
      }),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });
  const { getByTestId, getByRole } = render(<RouterProvider router={router} />);

  await waitFor(() => getByRole("search"));
  expect(getByTestId("search-input-field")).toBeInTheDocument();

  cleanup();
});

test("page load with search query param", async () => {
  const routes = [
    {
      path: "/",
      element: <Index />,
      loader: () => ({
        q: "test",
        searchResults: [],
      }),
    },
  ];
  const router = createMemoryRouter(routes, {
    initialEntries: ["/"],
  });
  const { getByTestId, getByRole } = render(<RouterProvider router={router} />);

  await waitFor(() => getByRole("search"));
  expect(getByTestId("search-input-field")).toHaveValue("test");

  cleanup();
});
