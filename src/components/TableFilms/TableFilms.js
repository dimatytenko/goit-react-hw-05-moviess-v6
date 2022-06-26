import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Card,
  CardMedia,
  Typography,
  CardContent,
  Grid,
} from "@mui/material";

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
        {films.map((film) => (
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
                  <Typography gutterBottom variant="h5" component="div">
                    {film.original_title || film.name}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {film.release_date}
                  </Typography>
                  <Typography gutterBottom variant="h5" component="div">
                    {film.vote_average}
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
