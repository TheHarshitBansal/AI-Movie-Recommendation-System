import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle.jsx";
import VideoBackground from "./VideoBackground.jsx";

import { Skeleton } from "primereact/skeleton";

const MainContainer = () => {
  const movies = useSelector((state) => state.movie?.nowPlaying);
  const mainMovie = movies[Math.floor(Math.random() * movies.length)];

  if (mainMovie === undefined) {
    return <Skeleton className="w-full h-full"></Skeleton>;
  }

  const { original_title, title, overview, id } = mainMovie;

  return (
    <div className="relative">
      <VideoTitle
        title={title || original_title}
        overview={overview}
        id={id}
        trailer
      />
      <VideoBackground id={id} />
    </div>
  );
};

export default MainContainer;
