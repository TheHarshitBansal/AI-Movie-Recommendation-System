import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constants.js";
import { useCallback } from "react";
import { addAiringTodayShows } from "../redux/slices/showSlice.js";

const useAiringTodayShows = () => {
  const dispatch = useDispatch();

  const getAiringTodayShows = useCallback(
    async (page = 1) => {
      try {
        const response = await fetch(
          `https://streamvibe.harshitbansal1201.workers.dev/tv/airing_today?&with_origin_country=IN&page=${page}`,
          API_OPTIONS
        );
        const data = await response.json();

        dispatch(addAiringTodayShows(data.results));
      } catch (error) {
        console.error("Failed to fetch shows:", error);
      }
    },
    [dispatch]
  );

  return { getAiringTodayShows };
};

export default useAiringTodayShows;
