import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/Loader";
import MoviePageForm from "../../components/MoviePageForm";

import moviesAPI from "../../API/movie-api";
import STATUS from "../../components/Status";

export default function MoviePage() {
  let navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";
  const [inputValue, setInputValue] = useState(searchQuery);
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue === "") {
      return;
    }
    requestMoviesByQuery(inputValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onChangeLocationSearch(inputValue);

    requestMoviesByQuery(inputValue);
    reset();
  };

  const requestMoviesByQuery = async (query) => {
    try {
      setStatus(STATUS.PENDING);
      const response = await moviesAPI.fetchSearchFilm(query);
      if (response.results.length === 0) {
        throw new Error(`${query} Not Found`);
      }
      setStatus(STATUS.RESOLVED);
      setFilms(response.results);
    } catch (error) {
      setError(error);
      setStatus(STATUS.REJECTED);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.currentTarget.value);
  };

  const reset = () => {
    setInputValue("");
  };

  function onChangeLocationSearch(value) {
    navigate({ ...location, search: `query=${value}` });
  }

  return (
    <div>
      <MoviePageForm
        onSubmit={handleSubmitForm}
        onChange={handleInputChange}
        value={inputValue}
      />

      {status === STATUS.IDLE && (
        <>
          <p>Movies are displayed here</p>
        </>
      )}

      {status === STATUS.REJECTED && (
        <>
          <p>{error}</p>
        </>
      )}

      {status === STATUS.PENDING && <Loader />}

      {status === STATUS.RESOLVED && films && (
        <ul>
          {films.map((film) => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `${film.id}`,
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
