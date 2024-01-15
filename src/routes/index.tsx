import {
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import invariant from "tiny-invariant";
import { cn } from "../utils/misc";
import { Spinner } from "components/spinner";
import { type NPMPackage } from "components/package-list-item";
import { SearchResults } from "components/search-results";
import { SearchBar } from "components/search-bar";
import { FailButton } from "components/fail-button";

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

  return (
    <main className="flex flex-col h-full w-full overflow-hidden">
      <header className="flex h-fit p-4 gap-4">
        <SearchBar q={q} />
        <FailButton />
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
