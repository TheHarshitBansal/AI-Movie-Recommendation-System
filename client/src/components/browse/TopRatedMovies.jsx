import { useSelector } from "react-redux";
import PosterCards from "./PosterCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import useTopRatedMovies from "../../hooks/useTopRatedMovies.js";
import {
  incrementTopRatedMovies,
  decrementTopRatedMovies,
} from "../../redux/slices/pageSlice.js";

const TopRatedMovies = () => {
  const { getTopRatedMovies } = useTopRatedMovies();
  const topRatedMovies = useSelector((state) => state.movie.topRated);
  const topRatedMoviesPage = useSelector((state) => state.page.topRatedMovies);
  if (!topRatedMovies) return null;

  return (
    <div className="w-full pt-10" id="topRatedMovies">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Top Rated Movies</h1>
        <PaginationButtons
          hook={getTopRatedMovies}
          next={topRatedMovies.length !== 0 ? true : false}
          page={topRatedMoviesPage}
          nextPage={incrementTopRatedMovies}
          prevPage={decrementTopRatedMovies}
        />
      </div>
      <div className=" mt-10 flex gap-x-5 overflow-scroll no-scrollbar">
        {topRatedMovies.map((movie) => (
          <PosterCards key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default TopRatedMovies;
