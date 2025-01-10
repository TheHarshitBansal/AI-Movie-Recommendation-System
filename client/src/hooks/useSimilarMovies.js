import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useSimilarMovies = ({id, show, page=1}) => {
  const [similarMovies, setSimilarMovies] = useState(null);

  const getSimilarMovies = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${show?'tv':'movie'}/${id}/similar?page=${page}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        // Use functional state update to ensure no stale closure
        setSimilarMovies(() => data.results);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
        getSimilarMovies();
    }
  }, [id]);

  return similarMovies;
};

export default useSimilarMovies;