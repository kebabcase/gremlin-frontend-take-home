import { useFetcher } from "react-router-dom";

export function FailButton() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form
      id="fail-api-form"
      role="button"
      method="post"
      action="fail-api"
    >
      <button
        id="fail-api"
        type="submit"
        className="p-2 border border-black rounded hover:bg-[#f7f7f7] dark:hover:bg-[#121212]"
      >
        Fail API
      </button>
    </fetcher.Form>
  );
}
