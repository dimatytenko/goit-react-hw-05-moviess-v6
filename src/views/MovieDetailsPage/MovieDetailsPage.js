import { useEffect, useState } from "react";
import {
  NavLink,
  useParams,
  useLocation,
  useNavigate,
  Outlet,
} from "react-router-dom";
import TurnLeftTwoToneIcon from "@mui/icons-material/TurnLeftTwoTone";

import styles from "./MovieDetailsPage.module.css";
import moviesAPI from "../../API/movie-api";
import { HomePageContainer } from "../HomePage/HomePage.styled";
import Loader from "../../components/Loader";
import { Status } from "../../constants/constants";

export default function MovieDetailsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { movieId } = useParams();

  const [film, setFilm] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const requestFilmById = async (id) => {
      try {
        setStatus(Status.PENDING);
        const response = await moviesAPI.fetchFilmById(id);

        if (response.success === false) {
          throw new Error(`Error: Not Found`);
        }
        setFilm(response);
        setStatus(Status.RESOLVED);
      } catch (error) {
        setError(error.message);
        setStatus(Status.REJECTED);
      }
    };
    requestFilmById(movieId);
  }, [movieId]);

  return (
    <HomePageContainer>
      <TurnLeftTwoToneIcon
        sx={{ cursor: "pointer" }}
        onClick={() => navigate(location?.state?.from?.location ?? "/")}
      />

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <p>{error}</p>}

      {status === Status.RESOLVED && (
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
                  to="cast"
                  state={{
                    from: {
                      location: location?.state?.from?.location ?? "/",
                    },
                  }}
                >
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="reviews"
                  state={{
                    from: {
                      location: location?.state?.from?.location ?? "/",
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
      <Outlet />
    </HomePageContainer>
  );
}
