const BASE_URL = "https://api.themoviedb.org/3/";
const API_KEY = "d5b2e28528ef5375cd1bf6b24ef269ad";

async function fetchFilmsTrending() {
  const response = await fetch(
    `${BASE_URL}trending/all/day?api_key=${API_KEY}`
  );
  return await response.json();
}

async function fetchSearchFilm(query) {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=1&query=${query}`
  );
  return await response.json();
}

async function fetchFilmById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

async function fetchFilmActorById(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`
  );
  return await response.json();
}

async function fetchFilmReview(id) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  );
  return await response.json();
}

const api = {
  fetchFilmsTrending,
  fetchSearchFilm,
  fetchFilmById,
  fetchFilmActorById,
  fetchFilmReview,
};
export default api;
