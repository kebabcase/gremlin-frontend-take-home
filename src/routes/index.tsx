import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import { useCallback, useState } from "react";
import invariant from "tiny-invariant";
import { cn } from "../utils/misc";
import { Spinner } from "components/spinner";
import { type NPMPackage } from "components/package-list-item";
import { SearchResults } from "components/search-results";

async function getNPMPackages(q: string) {
  let url = "https://api.npms.io/v2/search/suggestions";
  invariant(q, "Search string cannot be empty");

  if (q) {
    url += `?q=${q}`;
  }

  const response = await fetch(url);
  const json = await response.json();

  return json as NPMPackage[];
}

interface LoaderData {
  q: string | null;
  searchResults: NPMPackage[];
}

export async function loader({
  request,
}: LoaderFunctionArgs): Promise<LoaderData> {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const searchResults = q != null && q.length ? await getNPMPackages(q) : [];

  return {
    q,
    searchResults,
  };
}

function Index() {
  const { q, searchResults } = useLoaderData() as LoaderData;
  const navigation = useNavigation();
  const [, setSearchParams] = useSearchParams();

  const [valueChange, setValueChange] = useState<NodeJS.Timeout | null>(null);

  const handleValueChange = useCallback(
    (value: string) => {
      if (valueChange != null) clearTimeout(valueChange);

      setValueChange(
        setTimeout(() => {
          setSearchParams({ q: value });
          setValueChange(null);
        }, 150)
      );
    },
    [valueChange, setSearchParams]
  );

  return (
    <main className="flex flex-col h-full w-full overflow-hidden">
      <header className="h-fit p-4">
        <Form id="search-form" role="search">
          <input
            id="q"
            data-testid="search-input-field"
            aria-label="Search NPM packages"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q ?? undefined}
            onChange={(e) => handleValueChange(e.target.value)}
          />
        </Form>
      </header>
      <section
        className={cn(
          "flex flex-col flex-1 h-full w-full gap-4 p-4 overflow-y-auto",
          navigation.state === "loading" ? "loading" : ""
        )}
      >
        {navigation.state === "loading" ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-16 w-16" />
          </div>
        ) : (
          <SearchResults q={q} searchResults={searchResults} />
        )}
      </section>
    </main>
  );
}

export default Index;
