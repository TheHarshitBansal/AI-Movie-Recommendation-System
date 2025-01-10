import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { addNowPlayingMovies } from "../redux/slices/movieSlice.js";
import { useCallback } from "react";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const getNowPlayingMovies = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/now_playing?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addNowPlayingMovies(data.results));
      } catch (error) {
        console.error("Failed to fetch now-playing movies:", error);
      }
    },
    [dispatch]
  );

  return { getNowPlayingMovies };
}

export default useNowPlayingMovies;