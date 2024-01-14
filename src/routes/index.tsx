import {
  Form,
  LoaderFunctionArgs,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { cn } from "../utils/misc";
import invariant from "tiny-invariant";
import { Spinner } from "components/spinner";
import { type NPMPackage, PackageListItem } from "components/package-list-item";

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
      <header className="h-fit p-4">
        <Form id="search-form" role="search">
          <input
            id="q"
            aria-label="Search NPM packages"
            placeholder="Search"
            type="search"
            name="q"
            defaultValue={q ?? undefined}
          />
          <div id="search-spinner" aria-hidden hidden={true} />
          <div className="sr-only" aria-live="polite"></div>
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
          <>
            {searchResults.map((npmPackage) => (
              <PackageListItem
                key={npmPackage.highlight}
                npmPackage={npmPackage}
              />
            ))}
          </>
        )}
      </section>
    </main>
  );
}

export default Index;
