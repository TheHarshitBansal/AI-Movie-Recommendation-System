import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addTopRatedMovies } from "../redux/slices/movieSlice.js";
import { useCallback } from "react";

const useTopRatedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://streamvibe.harshitbansal1201.workers.dev/movie/top_rated?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();

        dispatch(addTopRatedMovies(data.results));
      } catch (error) {
        console.error("Failed to fetch now-playing movies:", error);
      }
    },
    [dispatch]
  );

  return { getTopRatedMovies };
};

export default useTopRatedMovies;
