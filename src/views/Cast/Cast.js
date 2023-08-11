import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import moviesAPI from "../../API/movie-api";
import { Status } from "../../constants/constants";
import CircularProgressWithLabel from "../../components/CircularProgressWithLabel";
import { StyledNameWrapper } from "./Cast.styled";

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

  console.log(actors);

  return (
    <>
      {status === Status.REJECTED && <p>{error}</p>}

      {status === Status.RESOLVED && (
        <Box sx={{ flexGrow: 1, mt: 2 }}>
          <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            columns={{ xs: 1, sm: 2, md: 4 }}
          >
            {actors
              .filter((el) => el.profile_path)
              .map((actor) => (
                <Grid item xs={1} sm={1} md={1} key={actor.id}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={actor.tagline}
                      height="140"
                      image={`https://image.tmdb.org/t/p/w342${actor.profile_path}`}
                    />
                    <CardContent>
                      <StyledNameWrapper>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          component="div"
                        >
                          {actor.name}
                        </Typography>
                        <CircularProgressWithLabel
                          value={
                            Math.floor(actor.popularity) <= 100
                              ? Math.floor(actor.popularity)
                              : 100
                          }
                        />
                      </StyledNameWrapper>
                      <Typography
                        gutterBottom
                        variant="subtitle2"
                        component="div"
                      >
                        Character: {actor.character}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </>
  );
}
