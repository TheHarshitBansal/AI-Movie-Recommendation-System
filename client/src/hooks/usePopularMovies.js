import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addPopularMovies } from "../redux/slices/movieSlice.js";
import { useCallback } from "react";

const usePopularMovies = () => {
  const dispatch = useDispatch();

  const getPopularMovies = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://streamvibe.harshitbansal1201.workers.dev/movie/popular?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addPopularMovies(data.results));
      } catch (error) {
        console.error("Failed to fetch now-playing movies:", error);
      }
    },
    [dispatch]
  );

  return { getPopularMovies };
};

export default usePopularMovies;
