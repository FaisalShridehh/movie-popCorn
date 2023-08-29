import  { useState, useEffect } from "react";

export function useMovies(query, API_KEY, callBack) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    setIsLoading(true);
    setErrorMessage("");
    async function fetchMovies() {
      try {
        const res = await fetch(`${API_KEY}&s=${query}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Couldn't fetch movies from server");
        const data = await res.json();
        // console.log(data);
        if (data.Response === "False")
          throw new Error(`There is no movies available`);
        setMovies(data.Search);
        setErrorMessage("");
      } catch (err) {
        if (err.name !== "AbortError") setErrorMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    callBack?.();
    fetchMovies();
    return function () {
      controller.abort();
    };
  }, [query, callBack, API_KEY]);
  return { movies, isLoading, errorMessage };
}
