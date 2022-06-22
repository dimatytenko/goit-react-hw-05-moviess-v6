import { useState, useEffect } from "react";

import moviesAPI from "../../API/movie-api";
import { Title, HomePageContainer } from "./HomePage.styled";
import { Status } from "../../constants/constants";
import Loader from "../../components/Loader";
import TableFilms from "../../components/TableFilms";

export default function HomePage() {
  const [films, setFilms] = useState(null);
  const [status, setStatus] = useState(Status.PENDING);
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
      setStatus(Status.RESOLVED);
    } catch (error) {
      setError(error);
      setStatus(Status.REJECTED);
    }
  };

  return (
    <HomePageContainer>
      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <p>{error.message}</p>}

      {status === Status.RESOLVED && (
        <>
          <Title>Trending today</Title>
          {films && <TableFilms path={"movies"} films={films} />}
        </>
      )}
    </HomePageContainer>
  );
}
