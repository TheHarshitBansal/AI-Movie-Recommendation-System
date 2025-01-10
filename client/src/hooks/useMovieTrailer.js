import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieTrailer = ({id, show}) => {
  const [trailerId, setTrailerId] = useState(null); // State to hold the trailer ID

  const getMovieTrailer = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${show ? "tv" : "movie"}/${id}/videos?language=en-US`,
        API_OPTIONS
      );
      const data = await response.json();

      const trailer = data.results.filter((video) => video.type === "Trailer");

      const displayTrailer = trailer.length
        ? trailer[0]
        : data.results[0];

      if (displayTrailer) {
        setTrailerId(displayTrailer.key); // Set the trailer's YouTube key (ID)
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getMovieTrailer();
    }
  }, [id]);

  return trailerId; // Return the trailer ID
};

export default useMovieTrailer;