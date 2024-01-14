import { type ErrorResponse, useRouteError, NavLink } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col h-full w-full">
      <div className="h-[50px]">
        <NavLink to="/">
          <button
            role="button"
            className="p-4 rounded hover:cursor-pointer hover:bg-[#f7f7f7]"
          >
            &larr; Back
          </button>
        </NavLink>
      </div>
      <div className="flex flex-col flex-1 justify-center items-center">
        <h1 className="text-2xl font-bold mb-4">Oops!</h1>
        <p className="text-muted-foreground mb-2">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          <i>
            {(error as ErrorResponse).statusText || (error as Error).message}
          </i>
        </p>
      </div>
    </div>
  );
}
