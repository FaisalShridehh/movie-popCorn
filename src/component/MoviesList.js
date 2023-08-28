import { useState } from "react";
import Movie from "./Movie";

export default function MoviesList({ movies, setSelectedID }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          setSelectedID={setSelectedID}
        />
      ))}
    </ul>
  );
}
