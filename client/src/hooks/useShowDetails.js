import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const useShowDetails = (id) => {
  const [showDetails, setShowDetails] = useState(null);

  const getShowDetails = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${id}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        // Use functional state update to ensure no stale closure
        setShowDetails(() => data);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
        getShowDetails();
    }
  }, [id]);

  return showDetails;
};

export default useShowDetails;