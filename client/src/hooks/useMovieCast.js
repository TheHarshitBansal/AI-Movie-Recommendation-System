import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useMovieCast = ({id, show}) => {
  const [movieCast, setMovieCast] = useState(null);

  const getMovieCast = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/${show?'tv':'movie'}/${id}/credits`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setMovieCast(() => data);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
        getMovieCast();
    }
  }, [id]);

  return movieCast;
};

export default useMovieCast;