import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import moviesAPI from "../../API/movie-api";

const STATUS = {
  IDLE: "idle",
  PENDING: "pending",
  REJECTED: "rejected",
  RESOLVED: "resolved",
};

export default function Reviews() {
  const { movieId } = useParams();
  const [views, setViews] = useState([]);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestReviewsById(movieId);
  }, [movieId]);

  const requestReviewsById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmReview(id);

      if (response.results.length === 0) {
        throw new Error(`We don't have any reviews for this`);
      }
      console.log(response.results);
      setViews(response.results);
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
          {views.map((view) => (
            <li key={view.id}>
              <h2>Author: {view.author}</h2>
              <p>{view.content}</p>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
