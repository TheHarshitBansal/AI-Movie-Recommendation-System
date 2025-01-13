import AiringTodayShows from "./AiringTodayShows.jsx";
import PopularShows from "./PopularShows.jsx";
import TopRatedShows from "./TopRatedShows.jsx";

const ShowsContainer = () => {
  return (
    <div className="relative my-20 mx-5 md:mx-10 lg:mx-20 px-2 md:px-5 lg:px-10 border border-black15 rounded-xl">
      <button className="absolute -top-5 text-white flex items-center justify-center text-xs md:text-sm font-semibold md:px-5 md:py-3 px-3 py-2 rounded-md bg-red45 w-fit hover:bg-opacity-80 disabled:bg-opacity-50">
        TV Shows
      </button>
      <AiringTodayShows />
      <PopularShows />
      <TopRatedShows />
    </div>
  );
};

export default ShowsContainer;
