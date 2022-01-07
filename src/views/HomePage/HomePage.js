import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moviesAPI from "../../API/movie-api";
import STATUS from "../../components/Status";

export default function HomePage() {
  const location = useLocation();
  console.log(location);
  let navigate = useNavigate();

  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState(STATUS.RESOLVED);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestMovies();
  }, []);

  const requestMovies = async () => {
    try {
      const response = await moviesAPI.fetchFilmsTrending();
      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setFilms(response.results);
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      setError(error);
      setStatus(STATUS.REJECTED);
    }
  };

  if (status === STATUS.REJECTED) {
    return <p>{error.message}</p>;
  }
  if (status === STATUS.RESOLVED) {
    return (
      <div>
        <h1>Trending today</h1>
        {films && (
          <ul>
            {films.map((film) => (
              <li key={film.id}>
                <Link
                  to={{
                    pathname: `movies/${film.id}`,
                    state: location,
                  }}
                >
                  {film.original_title || film.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
