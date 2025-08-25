import React, { useEffect, useState } from 'react'
export const KEY = "5656379d";

const useMovies = (query ) => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [movies, setMovies] = useState([]);

    
      useEffect(() => {
        // callback?.()
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
        // handleCloseMovie()
        fetchMovies();
    
        return () => {
          controller.abort();
        };
      }, [query]);
      return { movies, isLoading, error}
    
}

export default useMovies