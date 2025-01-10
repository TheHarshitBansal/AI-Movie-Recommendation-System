import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieDetails = (id) => {
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        // Use functional state update to ensure no stale closure
        setMovieDetails(() => data);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieDetails();
    }
  }, [id]);

  return movieDetails;
};

export default useMovieDetails;