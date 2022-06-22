import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import moviesAPI from "../../API/movie-api";
import { Status } from "../../constants/constants";
import { HomePageContainer } from "../HomePage/HomePage.styled";
import TableFilms from "../../components/TableFilms";
import Loader from "../../components/Loader";
import MoviePageForm from "../../components/MoviePageForm";

export default function MoviePage() {
  let navigate = useNavigate();
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("query") ?? "";
  const [inputValue, setInputValue] = useState(searchQuery);
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (inputValue === "") {
      return;
    }
    const requestMoviesByQuery = async (query) => {
      try {
        setStatus(Status.PENDING);
        const response = await moviesAPI.fetchSearchFilm(query);
        if (response.results.length === 0) {
          throw new Error(`${query} Not Found`);
        }
        setStatus(Status.RESOLVED);
        setFilms(response.results);
      } catch (error) {
        setError(error.message);
        setStatus(Status.REJECTED);
      }
    };
    requestMoviesByQuery(inputValue);
    onChangeLocationSearch(inputValue);
  }, [inputValue]);

  const handleSubmitForm = ({ search }) => {
    console.log(search);
    setInputValue(search);
  };

  function onChangeLocationSearch(value) {
    navigate({ ...location, search: `query=${value}` });
  }

  return (
    <HomePageContainer>
      <MoviePageForm onSubmit={handleSubmitForm} />

      {status === Status.IDLE && (
        <>
          <p>Movies are displayed here</p>
        </>
      )}

      {status === Status.REJECTED && (
        <>
          <p>{error}</p>
        </>
      )}

      {status === Status.PENDING && <Loader />}

      {status === Status.RESOLVED && films && <TableFilms films={films} />}
    </HomePageContainer>
  );
}
