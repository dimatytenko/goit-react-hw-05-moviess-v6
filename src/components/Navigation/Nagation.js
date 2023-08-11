import { Toolbar, Typography } from "@mui/material";
import TheatersTwoToneIcon from "@mui/icons-material/TheatersTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";

import { StyledLink } from "./Navigation.styled";

const Navigation = () => (
  <Toolbar>
    <TheatersTwoToneIcon sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }} />
    <Typography
      variant="h6"
      component="div"
      sx={{
        flexGrow: 1,
        display: { xs: "none", sm: "block" },
      }}
    >
      FILMOTEKA
    </Typography>
    <StyledLink to="/">
      <HomeWorkTwoToneIcon sx={{ display: "flex" }} />
      Home
    </StyledLink>
    <StyledLink to="/movies">
      <MovieCreationTwoToneIcon sx={{ display: "flex" }} />
      Movies
    </StyledLink>
  </Toolbar>
);

export default Navigation;
