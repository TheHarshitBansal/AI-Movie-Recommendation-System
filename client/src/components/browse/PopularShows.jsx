import { useSelector } from "react-redux";
import ShowCards from "./ShowCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import usePopularShows from "../../hooks/usePopularShows.js";
import {
  incrementPopularShows,
  decrementPopularShows,
} from "../../redux/slices/pageSlice.js";

const PopularShows = () => {
  const { getPopularShows } = usePopularShows();
  const popularShows = useSelector((state) => state.show.popular);
  const popularShowsPage = useSelector((state) => state.page.popularShows);
  if (!popularShows) return null;

  return (
    <div className="w-full py-5 lg:py-10" id="popularShows">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Popular Shows
        </h1>
        <PaginationButtons
          hook={getPopularShows}
          next={popularShows.length !== 0 ? true : false}
          page={popularShowsPage}
          nextPage={incrementPopularShows}
          prevPage={decrementPopularShows}
        />
      </div>
      <div className="mt-5 flex gap-x-2 md:gap-x-3 lg:gap-x-5 overflow-scroll no-scrollbar">
        {popularShows.map((show) => (
          <ShowCards key={show.id} id={show.id} />
        ))}
      </div>
    </div>
  );
};

export default PopularShows;
