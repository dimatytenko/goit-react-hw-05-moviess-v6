import { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate, Outlet } from "react-router-dom";
import TurnLeftTwoToneIcon from "@mui/icons-material/TurnLeftTwoTone";

import moviesAPI from "../../API/movie-api";
import Loader from "../../components/Loader";
import { Status } from "../../constants/constants";
import {
  MoviePageContainer,
  BackButton,
  StyledNavLink,
  StyledLinkWrapper,
  MovieDetailsContainer,
  ImageWrapper,
} from "./MovieDetailsPage.styled";

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
    <MoviePageContainer>
      <BackButton
        onClick={() => navigate(location?.state?.from?.location ?? "/")}
      >
        <TurnLeftTwoToneIcon sx={{ cursor: "pointer" }} />
        <h3>Back</h3>
      </BackButton>

      {status === Status.PENDING && <Loader />}

      {status === Status.REJECTED && <p>{error}</p>}

      {status === Status.RESOLVED && (
        <div>
          <MovieDetailsContainer>
            <ImageWrapper>
              <img
                src={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                alt={film.tagline}
              />
            </ImageWrapper>
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
          </MovieDetailsContainer>
          <div>
            <hr />
            <p>Additional information</p>
            <StyledLinkWrapper>
              <li>
                <StyledNavLink
                  to="cast"
                  state={{
                    from: {
                      location: location?.state?.from?.location ?? "/",
                    },
                  }}
                >
                  Cast
                </StyledNavLink>
              </li>
              <li>
                <StyledNavLink
                  to="reviews"
                  state={{
                    from: {
                      location: location?.state?.from?.location ?? "/",
                    },
                  }}
                >
                  Reviews
                </StyledNavLink>
              </li>
            </StyledLinkWrapper>
          </div>
          <hr />
        </div>
      )}
      <Outlet />
    </MoviePageContainer>
  );
}
