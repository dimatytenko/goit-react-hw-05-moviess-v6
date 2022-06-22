import { NavLink } from "react-router-dom";
import { Toolbar, Typography } from "@mui/material";
import TheatersTwoToneIcon from "@mui/icons-material/TheatersTwoTone";
import HomeWorkTwoToneIcon from "@mui/icons-material/HomeWorkTwoTone";
import MovieCreationTwoToneIcon from "@mui/icons-material/MovieCreationTwoTone";

import styles from "./Navigation.module.css";

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
    <NavLink to="/" className={styles.link}>
      <HomeWorkTwoToneIcon sx={{ display: "flex" }} />
      Home
    </NavLink>
    <NavLink to="/movies" className={styles.link}>
      <MovieCreationTwoToneIcon sx={{ display: "flex" }} />
      Movies
    </NavLink>
  </Toolbar>
);

export default Navigation;
