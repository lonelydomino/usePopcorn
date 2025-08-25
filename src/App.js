import { useEffect, useState } from "react";
import { MovieList } from "./components/MovieList";
import { WatchedSummary } from "./components/WatchedSummary";
import { Box } from "./components/Box";
import { WatchedMoviesList } from "./components/WatchedMoviesList";
import { Main } from "./components/Main";
import { MovieDetails } from "./components/MovieDetails";
import { Search } from "./components/Search";
import { NumResults } from "./components/NumResults";
import { Logo } from "./components/Logo";
import { NavBar } from "./components/NavBar";
import { Loader } from "./components/Loader";
import { ErrorMessage } from "./components/ErrorMessage";
import useMovies from "./custom hooks/useMovies";

export const KEY = "5656379d";

export default function App() {
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched")
    return JSON.parse(storedValue)
  });
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");
  const handleCloseMovie = () => {
    setSelectedId(null);
  };
  const {movies, isLoading, error } = useMovies(query, handleCloseMovie)

  const handleSelectMovie = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };
  

  const handleAddWatched = (m) => {
    setWatched((watched) => [...watched, m]);
    // localStorage.setItem('watched', JSON.stringify([...watched, m ]))
  };

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify(watched))

 },[watched])

 
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}{" "}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              {" "}
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
export const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
