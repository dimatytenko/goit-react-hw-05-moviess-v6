import { useState } from "react";
import { Link, useRouteMatch, useHistory, useLocation } from "react-router-dom";

import moviesAPI from "../../API/movie-api";

export default function MoviePage() {
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";

  const [inputValue, setInputValue] = useState(searchQuery);
  const [films, setFilms] = useState(null);

  const handleSubmitForm = (event) => {
    event.preventDefault();
    onChangeLocationSearch(inputValue);

    requestMoviesByQuery(inputValue);
    reset();
  };

  const requestMoviesByQuery = async (query) => {
    try {
      const response = await moviesAPI.fetchSearchFilm(query);
      if (response.results.length === 0) {
        throw new Error(`${query} Not Found`);
      }
      setFilms(response.results);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.currentTarget.value);
  };

  const reset = () => {
    setInputValue("");
  };

  function onChangeLocationSearch(value) {
    history.push({ ...location, search: `query=${value}` });
  }

  return (
    <div>
      <form onSubmit={handleSubmitForm}>
        <input
          value={inputValue}
          type="text"
          placeholder="Search films"
          onChange={handleInputChange}
        />
        <button type="submit">
          <span>Search</span>
        </button>
      </form>

      {films && (
        <ul>
          {films.map((film) => (
            <li key={film.id}>
              <Link
                to={{
                  pathname: `${url}/${film.id}`,
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
