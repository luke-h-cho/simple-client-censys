import SearchBar from "../SearchBar/SearchBar";

export default function Header() {
  return (
    <div>
      <h1 className="leading text-2xl font-bold">
        Welcome to the uglified Censys Search
      </h1>
      <SearchBar />
    </div>
  )
}
