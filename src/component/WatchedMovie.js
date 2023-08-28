export default function WatchedMovie({ movie, setWatched }) {
  function handleDeleteWatchedMovie(movieID) {
    setWatched((watched) =>
      watched.filter((movie) => movie.imdbID !== movieID)
    );
  }
  // console.log(movie)
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} Min</span> 
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatchedMovie(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}
