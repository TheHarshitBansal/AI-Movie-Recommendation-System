import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const usePersonCredits = ({ id, show }) => {
  const [personCredits, setPersonCredits] = useState(null);

  const getPersonCredits = async () => {
    try {
      const response = await fetch(
        `https://streamvibe.harshitbansal1201.workers.dev/person/${id}/${
          show ? "tv" : "movie"
        }_credits`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setPersonCredits(() => data.cast);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPersonCredits();
    }
  }, [id]);

  return personCredits;
};

export default usePersonCredits;
