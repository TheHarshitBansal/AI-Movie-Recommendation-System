import { useEffect } from "react";
import PlayingNowMovies from "./PlayingNowMovies.jsx";
import PopularMovies from "./PopularMovies.jsx";
import TopRatedMovies from "./TopRatedMovies.jsx";
import UpcomingMovies from "./UpcomingMovies.jsx";
import { useLocation } from "react-router-dom";

const MovieContainer = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const yOffset = -100;
        const yPosition =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: yPosition, behavior: "smooth" });
      }
    }
  }, [location]);
  return (
    <div className="relative mx-5 md:mx-10 lg:mx-20 px-2 md:px-5 lg:px-10 border border-black15 rounded-xl">
      <button className="absolute -top-5 text-white flex items-center justify-center text-xs md:text-sm font-semibold md:px-5 md:py-3 px-3 py-2 rounded-md bg-red45 w-fit hover:bg-opacity-80 disabled:bg-opacity-50">
        Movies
      </button>
      <PlayingNowMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
    </div>
  );
};

export default MovieContainer;
