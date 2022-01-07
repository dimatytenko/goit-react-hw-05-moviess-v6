import React from "react";
import { useEffect, useState, lazy, Suspense } from "react";
import {
  NavLink,
  useParams,
  Route,
  useLocation,
  Routes,
  useNavigate,
} from "react-router-dom";
import styles from "./MovieDetailsPage.module.css";
import moviesAPI from "../../API/movie-api";
import Loader from "../../components/Loader";
import ButtonGoBack from "../../components/ButtonGoBack";
import STATUS from "../../components/Status";

const Cast = lazy(() => import("../Cast"));
const Reviews = lazy(() => import("../Reviews"));

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  console.log(location);
  const navigate = useNavigate();
  // console.log(navigate);
  const [film, setFilm] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    requestFilmById(movieId);
  }, [movieId]);

  const requestFilmById = async (id) => {
    try {
      setStatus(STATUS.PENDING);
      const response = await moviesAPI.fetchFilmById(id);

      if (response.success === false) {
        throw new Error(`Error: Not Found`);
      }
      setFilm(response);
      setStatus(STATUS.RESOLVED);
    } catch (error) {
      setError(error.message);
      setStatus(STATUS.REJECTED);
    }
  };

  return (
    <>
      <ButtonGoBack
        onClick={() => navigate(location?.state?.from?.location ?? "/")}
      />

      {status === STATUS.PENDING && <Loader />}

      {status === STATUS.REJECTED && <p>{error}</p>}

      {status === STATUS.RESOLVED && (
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
                    pathname: "cast",
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
                    pathname: "reviews",
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
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Routes>
      </Suspense>
    </>
  );
}
