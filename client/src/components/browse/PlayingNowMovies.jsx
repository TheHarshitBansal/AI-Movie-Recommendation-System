import { useSelector } from "react-redux";
import PosterCards from "./PosterCards.jsx";
import PaginationButtons from "../PaginationButtons.jsx";
import useNowPlayingMovies from "../../hooks/useNowPlayingMovies.js";
import {
  incrementPlayingNowMovies,
  decrementPlayingNowMovies,
} from "../../redux/slices/pageSlice.js";

const PlayingNowMovies = () => {
  const { getNowPlayingMovies } = useNowPlayingMovies();
  const playingNowMovies = useSelector((state) => state.movie.nowPlaying);
  const playingNowMoviesPage = useSelector(
    (state) => state.page.playingNowMovies
  );
  if (!playingNowMovies) return null;
  return (
    <div className="w-full pt-10" id="playingNowMovies">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Playing Now Movies</h1>
        <PaginationButtons
          hook={getNowPlayingMovies}
          next={playingNowMovies.length !== 0 ? true : false}
          page={playingNowMoviesPage}
          nextPage={incrementPlayingNowMovies}
          prevPage={decrementPlayingNowMovies}
        />
      </div>
      <div className=" mt-10 flex gap-x-5 overflow-scroll no-scrollbar">
        {playingNowMovies.map((movie) => (
          <PosterCards key={movie.id} id={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default PlayingNowMovies;
