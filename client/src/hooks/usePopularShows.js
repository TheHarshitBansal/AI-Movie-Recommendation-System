import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { useCallback } from "react";
import { addPopularShows } from "../redux/slices/showSlice.js";

const usePopularShows = () => {
  const dispatch = useDispatch();

  const getPopularShows = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://streamvibe.harshitbansal1201.workers.dev/tv/popular?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();
        dispatch(addPopularShows(data.results));
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    },
    [dispatch]
  );

  return { getPopularShows };
};

export default usePopularShows;
