import { use, useEffect, useRef, useState } from "react";
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

export const KEY = "5656379d";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState(() => {
    const storedValue = localStorage.getItem("watched")
    return JSON.parse(storedValue)
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState("");

  const handleSelectMovie = (movieId) => {
    setSelectedId((selectedId) => (selectedId === movieId ? null : movieId));
  };
  const handleCloseMovie = () => {
    setSelectedId(null);
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

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie not found");
        setMovies(data.Search);
        setError("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (!query.length < 3) {
      setMovies([]);
      setError("");
    }
    handleCloseMovie()
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

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
