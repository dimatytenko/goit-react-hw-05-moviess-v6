import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import moviesAPI from "../../API/movie-api";
import { Status } from "../../constants/constants";

export default function Cast() {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestActorsById(movieId);
  }, [movieId]);

  const requestActorsById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmActorById(id);

      if (response.cast.length === 0) {
        throw new Error(`We don't have any actors`);
      }
      setActors(response.cast);
      setStatus(Status.RESOLVED);
    } catch (error) {
      setError(error.message);
      setStatus(Status.REJECTED);
    }
  };

  return (
    <>
      {status === Status.REJECTED && <p>{error}</p>}

      {status === Status.RESOLVED && (
        <ul>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                alt={actor.name}
              ></img>
              <p>{actor.name}</p>
              <p>Character: {actor.character}</p>

              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
