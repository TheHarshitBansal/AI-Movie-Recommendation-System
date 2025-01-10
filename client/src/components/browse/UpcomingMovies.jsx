import { useSelector } from "react-redux";
import PosterCards from "./PosterCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import useUpcomingMovies from "../../hooks/useUpcomingMovies.js";
import {
  incrementUpcomingMovies,
  decrementUpcomingMovies,
} from "../../redux/slices/pageSlice.js";

const UpcomingMovies = () => {
  const { getUpcomingMovies } = useUpcomingMovies();
  const upcomingMovies = useSelector((state) => state.movie.upcoming);
  const upcomingMoviesPage = useSelector((state) => state.page.upcomingMovies);
  if (!upcomingMovies) return null;

  return (
    <div className="w-full py-10" id="upcomingMovies">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Upcoming Movies</h1>
        <PaginationButtons
          hook={getUpcomingMovies}
          next={upcomingMovies.length !== 0 ? true : false}
          page={upcomingMoviesPage}
          nextPage={incrementUpcomingMovies}
          prevPage={decrementUpcomingMovies}
        />
      </div>
      <div className=" mt-10 flex gap-x-5 overflow-scroll no-scrollbar">
        {upcomingMovies.map((movie) => (
          <PosterCards key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default UpcomingMovies;
