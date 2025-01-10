import VideoTitle from "../browse/VideoTitle.jsx";
import MovieDetailsVideoBackground from "../movie/MovieDetailsVideoBackground.jsx";

const ShowMain = ({ show }) => {
  return (
    <div className="relative mt-20">
      <VideoTitle title={show.name} overview={show.overview} />
      <MovieDetailsVideoBackground id={show.id} show />
    </div>
  );
};

export default ShowMain;
