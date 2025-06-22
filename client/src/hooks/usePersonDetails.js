import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const usePersonDetails = (id) => {
  const [personDetails, setPersonDetails] = useState(null);

  const getPersonDetails = async () => {
    try {
      const response = await fetch(
        `https://streamvibe.harshitbansal1201.workers.dev/person/${id}`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setPersonDetails(() => data);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPersonDetails();
    }
  }, [id]);

  return personDetails;
};

export default usePersonDetails;
