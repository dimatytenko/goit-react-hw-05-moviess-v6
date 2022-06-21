import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

import Layout from "./views/Layout";
import Loader from "./components/Loader";
const HomePage = lazy(() => import("./views/HomePage"));
const MoviesPage = lazy(() => import("./views/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./views/MovieDetailsPage"));
const Cast = lazy(() => import("./views/Cast"));
const Reviews = lazy(() => import("./views/Reviews"));

function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="*" element={<h2>notFound</h2>} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
