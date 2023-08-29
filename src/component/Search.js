import { useEffect, useRef, useState } from "react";

export default function Search({ query, setQuery }) {
  const searchInput = useRef(null);
  useEffect(
    function () {
      function callBack(e) {
        if (document.activeElement === searchInput.current) return;
        if (e.code === "Enter") {
          searchInput.current.focus();
          setQuery("");
        }
      }
      document.addEventListener("keydown", callBack);
      // console.log("Search input", searchInput);
      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },

    [setQuery]
  );
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
