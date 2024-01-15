import { NPMPackage, PackageListItem } from "./package-list-item";

interface Props {
  q: string | null;
  searchResults: NPMPackage[];
}

export function SearchResults({ q, searchResults }: Props) {
  return q != null && q.length > 0 && searchResults.length <= 0 ? (
    <div className="flex flex-col flex-1 justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">No Results</h1>
      <p className="text-muted-foreground mb-2">
        Try looking for something else!
      </p>
    </div>
  ) : (
    <>
      {searchResults.map((npmPackage) => (
        <PackageListItem key={npmPackage.highlight} npmPackage={npmPackage} />
      ))}
    </>
  );
}
