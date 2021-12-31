import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import moviesAPI from "../../API/movie-api";

export default function Cast() {
  const { movieId } = useParams();

  const [actors, setActors] = useState([]);

  useEffect(() => {
    requestActorsById(movieId);
  }, [movieId]);

  const requestActorsById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmActorById(id);

      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setActors(response.cast);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {(actors.length > 0 && (
        <ul>
          {actors.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                alt={actor.name}
              ></img>
              <p>{actor.name}</p>
              <hr />
            </li>
          ))}
        </ul>
      )) || <p>We don't have any actors</p>}
    </>
  );
}
