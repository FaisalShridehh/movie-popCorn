import { useRef } from "react";
import { useKeyDown } from "../customHooks/useKeyDown";

export default function Search({ query, setQuery }) {
  const searchInput = useRef(null);

  useKeyDown("Enter", () => {
    if (document.activeElement === searchInput.current) return;
    searchInput.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={searchInput}
    />
  );
}
