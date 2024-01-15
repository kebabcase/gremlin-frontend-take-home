import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import invariant from "tiny-invariant";
import { Spinner } from "components/spinner";
import { type NPMPackage } from "components/package-list-item";
import { SearchResults } from "components/search-results";
import { SearchBar } from "components/search-bar";
import { FailButton } from "components/fail-button";
import { type Theme, useTheme } from "../hooks/theme";
import { useEffect } from "react";

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

  const [theme, setTheme] = useTheme();
  const nextTheme: Theme = theme === "light" ? "dark" : "light";

  useEffect(() => {
    if (!document.documentElement.classList.contains(theme)) {
      document.documentElement.classList.add(theme);
    }
  }, [theme]);

  return (
    <main className="flex flex-col h-full w-full overflow-hidden dark:bg-[#323232] dark:text-[#f7f7f7]">
      <header className="flex h-fit p-4 gap-4 border-b">
        <SearchBar q={q} />
        <FailButton />
      </header>
      <section className="flex flex-col flex-1 h-full w-full gap-4 p-4 overflow-y-auto">
        {navigation.state === "loading" ? (
          <div className="flex h-full w-full items-center justify-center">
            <Spinner className="h-16 w-16" />
          </div>
        ) : (
          <SearchResults q={q} searchResults={searchResults} />
        )}
      </section>
      <footer className="h-fit p-4 border-t">
        <button
          type="button"
          role="button"
          aria-description="theme-button"
          onClick={() => setTheme(nextTheme)}
        >
          {theme === "light" ? <span>&#9789;</span> : <span>&#9788;</span>}
        </button>
      </footer>
    </main>
  );
}

export default Index;
