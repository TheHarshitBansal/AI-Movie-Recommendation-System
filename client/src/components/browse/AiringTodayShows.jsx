import { useSelector } from "react-redux";
import ShowCards from "./ShowCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import useAiringTodayShows from "../../hooks/useAiringTodayShows.js";
import {
  incrementAiringTodayShows,
  decrementAiringTodayShows,
} from "../../redux/slices/pageSlice.js";

const AiringTodayShows = () => {
  const { getAiringTodayShows } = useAiringTodayShows();
  const airingToday = useSelector((state) => state.show.airingToday);
  const airingTodayPage = useSelector((state) => state.page.airingTodayShows);
  if (!airingToday) return null;

  return (
    <div className="w-full py-5 lg:py-10" id="airingTodayShows">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">
          Airing Today Shows
        </h1>
        <PaginationButtons
          hook={getAiringTodayShows}
          next={airingToday.length !== 0 ? true : false}
          page={airingTodayPage}
          nextPage={incrementAiringTodayShows}
          prevPage={decrementAiringTodayShows}
        />
      </div>
      <div className="mt-5 flex gap-x-2 md:gap-x-3 lg:gap-x-5 overflow-scroll no-scrollbar">
        {airingToday.map((show) => (
          <ShowCards key={show.id} id={show.id} />
        ))}
      </div>
    </div>
  );
};

export default AiringTodayShows;
