import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import moviesAPI from "../../API/movie-api";
import STATUS from "../../components/Status";

export default function Cast() {
  const { movieId } = useParams();
  const location = useLocation();
  console.log(location);

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
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      setError(error.message);
      setStatus(STATUS.REJECTED);
    }
  };

  return (
    <div>
      {status === STATUS.REJECTED && <p>{error}</p>}

      {status === STATUS.RESOLVED && (
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
    </div>
  );
}
