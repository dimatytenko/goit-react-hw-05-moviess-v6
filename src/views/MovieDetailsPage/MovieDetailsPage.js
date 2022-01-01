import React from "react";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  NavLink,
  useParams,
  useRouteMatch,
  Route,
  useLocation,
  useHistory,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import moviesAPI from "../../API/movie-api";
import Loader from "../../components/Loader";
import ButtonGoBack from "../../components/ButtonGoBack";

const Cast = lazy(() => import("../Cast"));
const Reviews = lazy(() => import("../Reviews"));

export default function MovieDetailsPage() {
  const { url, path } = useRouteMatch();
  const { movieId } = useParams();
  const location = useLocation();
  const history = useHistory();
  const [film, setFilm] = useState(null);

  useEffect(() => {
    requestFilmById(movieId);
  }, [movieId]);

  const requestFilmById = async (id) => {
    try {
      const response = await moviesAPI.fetchFilmById(id);

      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setFilm(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ButtonGoBack
        onClick={() => history.push(location?.state?.from?.location ?? "/")}
      />
      {film && (
        <div>
          <div className={styles.box}>
            <div className={styles.img}>
              <img
                src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                alt={film.tagline}
              />
            </div>
            <div>
              <h2>{film.title}</h2>
              <h3>Overview</h3>
              <p>{film.overview}</p>
              <h3>Genres</h3>
              <ul>
                {film.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <hr />
            <p>Additional information</p>
            <ul>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/cast`,
                    state: {
                      from: {
                        location: location?.state?.from?.location ?? "/",
                      },
                    },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${url}/reviews`,
                    state: {
                      from: {
                        location: location?.state?.from?.location ?? "/",
                      },
                    },
                  }}
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <hr />
        </div>
      )}
      <Suspense fallback={<Loader />}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
