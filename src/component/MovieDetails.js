import { useEffect, useState } from "react";
import StarsRating from "./StarsRating";
import Loader from "./Loader";

import { API_KEY } from "../App";

// function Loader() {
//   return (
//     <div className="loader">
//       <p>Loading...</p>
//     </div>
//   );
// }
export default function MovieDetails({
  selectedID,
  setSelectedID,
  setWatched,
  watched,
}) {
  const [movieData, setMovieData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isAlreadyWatched = watched
    ?.map((movie) => movie.imdbID)
    .includes(selectedID);

  const watchedUserRating = watched.find(
    (movie) => movie.imdbID === selectedID
  )?.userRating;

  const {
    Poster: poster,
    Title: title,
    Year: year,
    Released: released,
    Genre: genre,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movieData;

  function handleWatchedMovie(selectedMovie) {
    const newWatchedMovie = {
      imdbID: selectedMovie.imdbID,
      poster: selectedMovie.Poster,
      title: selectedMovie.Title,
      year: selectedMovie.Year,
      released: selectedMovie.Released,
      genre: selectedMovie.Genre,
      runtime: selectedMovie.Runtime.split(" ").at(0),
      imdbRating: Number(selectedMovie.imdbRating),
      plot: selectedMovie.Plot,
      actors: selectedMovie.Actors,
      director: selectedMovie.Director,
      userRating,
    };
    // console.log(selectedMovie)
    setWatched((watchedMovie) => [...watchedMovie, newWatchedMovie]);
    setSelectedID(null);
  }
  useEffect(() => {
    setIsLoading(true);
    async function fetchMovie() {
      try {
        const res = await fetch(`${API_KEY}&i=${selectedID}`);
        const data = await res.json();
        // console.log(data);
        setMovieData(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    fetchMovie();
  }, [selectedID]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;
    return function () {
      document.title = `usePopcorn`;
    };
  }, [title]);

  useEffect(() => {
    function keyDownCallback(e) {
      if (e.code === "Escape") {
        setSelectedID(null);
        console.log("keyDownCallback");
      }
    }

    document.addEventListener("keydown", keyDownCallback);
    return function () {
      document.removeEventListener("keydown", keyDownCallback);
    };
  }, [setSelectedID]);
  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={() => setSelectedID(null)}>
              &larr;
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>⭐{imdbRating} IMDb rating</p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isAlreadyWatched ? (
                <>
                  <StarsRating
                    maxRating={10}
                    size={30}
                    onSetRating={setUserRating}
                    className="stars-container"
                  />
                  {userRating > 0 && (
                    <button
                      className="btn-add"
                      onClick={() => handleWatchedMovie(movieData)}
                    >
                      + Add to Watched List
                    </button>
                  )}
                </>
              ) : (
                <p>You already rate this movie with {watchedUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
