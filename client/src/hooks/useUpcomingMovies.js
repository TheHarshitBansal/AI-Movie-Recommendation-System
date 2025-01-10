import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { useCallback } from "react";
import { addUpcomingMovies } from "../redux/slices/movieSlice.js";

const useUpcomingMovies = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/upcoming?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();
        
        dispatch(addUpcomingMovies(data.results));
        
      } catch (error) {
        console.error("Failed to fetch now-playing movies:", error);
      }
    },
    [dispatch]
  );

  return { getUpcomingMovies };
}

export default useUpcomingMovies;