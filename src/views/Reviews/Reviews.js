import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import moviesAPI from "../../API/movie-api";

export default function Reviews() {
  const { movieId } = useParams();
  const [views, setViews] = useState([]);

  useEffect(() => {
    requestReviewsById(movieId);
  }, [movieId]);

  const requestReviewsById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmReview(id);

      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setViews(response.results);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {(views.length > 0 &&
        views.map((view) => (
          <ul key={view.id}>
            <li>
              <h2>Author: {view.author}</h2>
              <p>{view.content}</p>
            </li>
          </ul>
        ))) || <p>We don't have any reviews for this</p>}
    </>
  );
}
