import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieReviews = ({ id, page = 1, show }) => {
  const [movieReviews, setMovieReviews] = useState(null);

  const getMovieReviews = async () => {
    try {
      const response = await fetch(
        `https://streamvibe.harshitbansal1201.workers.dev/${
          show ? "tv" : "movie"
        }/${id}/reviews?page=${page}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setMovieReviews(() => data.results);
      }
    } catch (error) {
      console.error("Error fetching Reviews:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieReviews();
    }
  }, [id]);

  return movieReviews;
};

export default useMovieReviews;
