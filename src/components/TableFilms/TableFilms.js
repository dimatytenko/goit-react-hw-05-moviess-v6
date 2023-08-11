import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

import CircularProgressWithLabel from "../CircularProgressWithLabel";
import { StyledNameWrapper } from "./TableFilm.styles";

export default function TableFilms({ films, path }) {
  const location = useLocation();

  return (
    <Box sx={{ flexGrow: 1, mt: 2 }}>
      <Grid
        container
        columnSpacing={2}
        rowSpacing={2}
        columns={{ xs: 1, sm: 2, md: 4 }}
      >
        {films
          .filter((el) => el.poster_path)
          .map((film) => (
            <Grid item xs={1} sm={1} md={1} key={film.id}>
              <Link
                to={path ? `${path}/${film.id}` : `${film.id}`}
                state={{
                  from: {
                    location,
                  },
                }}
              >
                <Card>
                  <CardMedia
                    component="img"
                    alt={film.tagline}
                    height="140"
                    image={`https://image.tmdb.org/t/p/w342${film.poster_path}`}
                  />
                  <CardContent>
                    <StyledNameWrapper>
                      <Typography
                        gutterBottom
                        variant="subtitle1"
                        component="div"
                      >
                        {film.original_title || film.name}
                      </Typography>
                      <CircularProgressWithLabel
                        value={
                          Math.floor(film.popularity) <= 100
                            ? Math.floor(film.popularity)
                            : 100
                        }
                      />
                    </StyledNameWrapper>
                    <Typography
                      gutterBottom
                      variant="subtitle2"
                      component="div"
                    >
                      Release: {film.release_date}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
