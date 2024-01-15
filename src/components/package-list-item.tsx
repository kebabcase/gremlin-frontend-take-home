import { Link } from "react-router-dom";

export interface NPMPackage {
  highlight: string;
  package: Package;
  score: Score;
  searchScore: number;
}

interface Package {
  name: string;
  scope: "unscoped" | "scoped";
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: PackageLinks;
  author: PackageAuthor;
  publisher: NPMUser;
  maintainers: NPMUser[];
}

interface PackageLinks {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

interface PackageAuthor {
  name: string;
  email: string;
  url: string;
}

interface NPMUser {
  username: string;
  email: string;
}

interface Score {
  detail: ScoreDetail;
  final: number;
}

interface ScoreDetail {
  maintenance: number;
  popularity: number;
  quality: number;
}

interface Props {
  npmPackage: NPMPackage;
}

export function PackageListItem({ npmPackage }: Props) {
  return (
    <Link
      className="flex flex-col border rounded p-4 hover:bg-[#f7f7f7] dark:hover:bg-[#121212]"
      to={npmPackage.package.links.npm}
      target="_blank"
      rel="noopener noreferrer"
    >
      <span className="font-bold">{npmPackage.package.name}</span>
      <span>{npmPackage.package.description}</span>
    </Link>
  );
}
