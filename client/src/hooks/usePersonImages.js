import { useState, useEffect } from "react";
import { API_OPTIONS } from "../utils/constants.js";

const usePersonImages = (id) => {
  const [personImages, setPersonImages] = useState(null);

  const getPersonImages = async () => {
    try {
      const response = await fetch(
        `https://streamvibe.harshitbansal1201.workers.dev/person/${id}/images`,
        API_OPTIONS
      );
      const data = await response.json();

      if (data) {
        setPersonImages(() => data.profiles);
      }
    } catch (error) {
      console.error("Error fetching Details:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getPersonImages();
    }
  }, [id]);

  return personImages;
};

export default usePersonImages;
