import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useEpisodeDetails = ({showId, number}) => {
  const [episodeDetails, setEpisodeDetails] = useState(null);

  const getEpisodeDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${showId}/season/${number}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setEpisodeDetails(() => data.episodes);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (showId) {
        getEpisodeDetails();
    }
  }, [showId]);

  return episodeDetails;
};

export default useEpisodeDetails;