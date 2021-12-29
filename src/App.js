import { Route, Switch } from "react-router-dom";
import "./App.css";

import Container from "./components/Container";
import Appbar from "./components/AppBar";
import HomePage from "./views/HomePage";
import MoviesPage from "./views/MoviesPage";
import MovieDetailsPage from "./views/MovieDetailsPage";

function App() {
  return (
    <Container>
      <Appbar />

      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>

        <Route path="/movies" exact>
          <MoviesPage />
        </Route>

        <Route path="/movies/:movieId">
          <MovieDetailsPage />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
