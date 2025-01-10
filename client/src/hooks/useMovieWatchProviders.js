import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieWatchProviders = ({id, show}) => {
  const [movieWatchProviders, setMovieWatchProviders] = useState(null);

  const getMovieWatchProviders = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${show?'tv':'movie'}/${id}/watch/providers`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setMovieWatchProviders(() => data.results?.IN);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
        getMovieWatchProviders();
    }
  }, [id]);

  return movieWatchProviders;
};

export default useMovieWatchProviders;