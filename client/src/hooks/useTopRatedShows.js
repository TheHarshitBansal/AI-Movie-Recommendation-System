import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { useCallback } from "react";
import { addTopRatedShows } from "../redux/slices/showSlice.js";

const useTopRatedShows = () => {
  const dispatch = useDispatch();

  const getTopRatedShows = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://streamvibe.harshitbansal1201.workers.dev/tv/top_rated?region=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();

        dispatch(addTopRatedShows(data.results));
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    },
    [dispatch]
  );

  return { getTopRatedShows };
};

export default useTopRatedShows;
