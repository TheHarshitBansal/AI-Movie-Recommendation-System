import VideoTitle from "../browse/VideoTitle.jsx";
import MovieDetailsVideoBackground from "./MovieDetailsVideoBackground.jsx";

const MovieMain = ({ movie }) => {
  const { original_title, title, overview } = movie;

  return (
    <div className="relative mt-20">
      <VideoTitle title={title || original_title} overview={overview} />
      <MovieDetailsVideoBackground id={movie.id} />
    </div>
  );
};

export default MovieMain;
