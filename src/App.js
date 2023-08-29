import { useCallback, useState } from "react";
import NavBar from "./component/NavBar";
import Main from "./component/Main";
import NumResults from "./component/NumResults";
import Box from "./component/Box";
import MoviesList from "./component/MoviesList";
// import WatchedBox from "./component/WatchedBox";
import WatchedMoviesList from "./component/WatchedMoviesList";
import WatchedSummary from "./component/WatchedSummary";
import MovieDetails from "./component/MovieDetails";
import ErrorHandling from "./component/ErrorHandling";
import Loader from "./component/Loader";
import { useMovies } from "./customHooks/useMovies";
import { useLocalStorage } from "./customHooks/useLocalStorage";
// import WatchedMovie from "./component/WatchedMovie";

export const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

export const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export const API_KEY = `http://www.omdbapi.com/?apikey=81e430ab`;

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedID, setSelectedID] = useState(null);

  const { movies, isLoading, errorMessage } = useMovies(
    query,
    API_KEY,
    useCallback(()=> setSelectedID(null),[])
  );

  // const [watched, setWatched] = useState([]);
  const [watched, setWatched] = useLocalStorage([] , "watchedMovies")


  return (
    <>
      <NavBar query={query} setQuery={setQuery}>
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <MoviesList movies={movies} />} */}
          {isLoading ? (
            <Loader />
          ) : errorMessage ? (
            <ErrorHandling message={errorMessage} />
          ) : (
            <MoviesList movies={movies} setSelectedID={setSelectedID} />
          )}

          {/* --------------------- another way using short circuit -------------------- */}
          {/* --------------------- || -------------------- */}
          {/* --------------------- \/ -------------------- */}
          {/* {isLoading && <Loader />}
          {!isLoading && !errorMessage && <MoviesList movies={movies} />}
          {errorMessage && <ErrorHandling message={errorMessage} />} */}
        </Box>

        <Box>
          {selectedID ? (
            <MovieDetails
              selectedID={selectedID}
              setSelectedID={setSelectedID}
              setWatched={setWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} setWatched={setWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
