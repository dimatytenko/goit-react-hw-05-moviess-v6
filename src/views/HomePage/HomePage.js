import { useState, useEffect } from "react";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import moviesAPI from "../../API/movie-api";
import Loader from "../../components/Loader";

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved",
};

export default function HomePage() {
  const { url } = useRouteMatch();
  const location = useLocation();
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState(STATUS.RESOLVED);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestMovies();
  }, []);

  const requestMovies = async () => {
    try {
      setStatus(STATUS.PENDING);
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

  if (status === STATUS.PENDING) {
    return (
      <>
        <Loader />
      </>
    );
  }

  if (status === STATUS.REJECTED) {
    return <h1>{error.message}</h1>;
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
                    pathname: `${url}movies/${film.id}`,
                    state: {
                      from: {
                        location,
                      },
                    },
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
