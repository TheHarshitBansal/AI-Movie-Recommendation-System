import usePopularMovies from "../../hooks/usePopularMovies.js";
import PaginationButtons from "../PaginationButtons.jsx";
import PosterCards from "./PosterCards.jsx";
import { useSelector } from "react-redux";
import {
  incrementPopularMovies,
  decrementPopularMovies,
} from "../../redux/slices/pageSlice.js";

const PopularMovies = () => {
  const { getPopularMovies } = usePopularMovies();
  const popularMovies = useSelector((state) => state.movie.popular);
  const popularMoviesPage = useSelector((state) => state.page.popularMovies);
  if (!popularMovies) return null;

  return (
    <div className="w-full pt-10" id="popularMovies">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Popular Movies</h1>
        <PaginationButtons
          hook={getPopularMovies}
          next={popularMovies.length !== 0 ? true : false}
          page={popularMoviesPage}
          nextPage={incrementPopularMovies}
          prevPage={decrementPopularMovies}
        />
      </div>
      <div className=" mt-10 flex gap-x-5 overflow-scroll no-scrollbar">
        {popularMovies.map((movie) => (
          <PosterCards key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default PopularMovies;
