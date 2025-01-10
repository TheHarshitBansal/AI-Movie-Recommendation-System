import ImagesContainer from "./ImagesContainer.jsx";
import MovieCast from "./MovieCast.jsx";
import MovieDetailsSideBar from "./MovieDetailsSideBar.jsx";
import MovieOverview from "./MovieOverview.jsx";
import MovieReviewContainer from "./MovieReviewContainer.jsx";
import SimilarMovies from "./SimilarMovies.jsx";
import SeasonContainer from "../show/SeasonContainer.jsx";

const MovieSecondary = ({ movie, show }) => {
  return (
    <div className="text-white my-20 flex flex-col gap-y-5 w-full">
      <div className="flex gap-x-5">
        <div className="w-[70%] flex flex-col gap-y-5 h-full">
          <MovieOverview desc={movie.overview} />
          <MovieCast id={movie.id} show={show} />
        </div>
        <div className="w-[30%]">
          <MovieDetailsSideBar movie={movie} show={show} />
        </div>
      </div>
      {show && <SeasonContainer season={movie.seasons} />}
      <MovieReviewContainer id={movie.id} show={show} />
      <ImagesContainer id={movie.id} show={show} />
      <SimilarMovies id={movie.id} show={show} />
    </div>
  );
};

export default MovieSecondary;
