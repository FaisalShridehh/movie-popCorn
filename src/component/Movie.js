export default function  Movie({ movie, setSelectedID }) {
  return (
    <li
      onClick={() =>
        setSelectedID((selectedID) =>
          movie.imdbID === selectedID ? null : movie.imdbID
        )
      }
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
