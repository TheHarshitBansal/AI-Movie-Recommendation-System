import { useSelector } from "react-redux";
import ShowCards from "./ShowCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import useTopRatedShows from "../../hooks/useTopRatedShows.js";
import {
  incrementTopRatedShows,
  decrementTopRatedShows,
} from "../../redux/slices/pageSlice.js";

const TopRatedShows = () => {
  const { getTopRatedShows } = useTopRatedShows();
  const topRatedShows = useSelector((state) => state.show.topRated);
  const topRatedPage = useSelector((state) => state.page.topRatedShows);
  if (!topRatedShows) return null;

  return (
    <div className="w-full py-10" id="topRatedShows">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Top Rated Shows</h1>
        <PaginationButtons
          hook={getTopRatedShows}
          next={topRatedShows.length !== 0 ? true : false}
          page={topRatedPage}
          nextPage={incrementTopRatedShows}
          prevPage={decrementTopRatedShows}
        />
      </div>
      <div className=" mt-10 flex gap-x-5 overflow-scroll no-scrollbar">
        {topRatedShows.map((show) => (
          <ShowCards key={show.id} id={show.id} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedShows;
