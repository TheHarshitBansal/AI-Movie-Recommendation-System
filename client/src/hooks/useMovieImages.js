import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieImages = ({ id, show }) => {
  const [movieImages, setMovieImages] = useState(null);

  const getMovieImages = async () => {
    try {
      const response = await fetch(
        `https://streamvibe.harshitbansal1201.workers.dev/${
          show ? "tv" : "movie"
        }/${id}/images`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        // Use functional state update to ensure no stale closure
        setMovieImages(() => data.backdrops);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieImages();
    }
  }, [id]);

  return movieImages;
};

export default useMovieImages;
