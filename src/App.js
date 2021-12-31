import { lazy, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Container from "./components/Container";
import Appbar from "./components/AppBar";
import Loader from "./components/Loader";
const HomePage = lazy(() => import("./views/HomePage"));
const MoviesPage = lazy(() => import("./views/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./views/MovieDetailsPage"));

function App() {
  return (
    <Container>
      <Appbar />

      <Suspense fallback={<Loader />}>
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

          <Route>
            <HomePage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}

export default App;
