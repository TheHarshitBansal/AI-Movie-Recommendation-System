import AiringTodayShows from "./AiringTodayShows.jsx";
import PopularShows from "./PopularShows.jsx";
import TopRatedShows from "./TopRatedShows.jsx";

const ShowsContainer = () => {
  return (
    <div className="relative mx-20 my-20 px-10 border border-black15 rounded-xl">
      <button className="absolute -top-5 text-white flex items-center justify-center text-sm font-semibold px-5 py-3 rounded-md bg-red45 w-fit hover:bg-opacity-80 disabled:bg-opacity-50">
        TV Shows
      </button>
      <AiringTodayShows />
      <PopularShows />
      <TopRatedShows />
    </div>
  );
};

export default ShowsContainer;
