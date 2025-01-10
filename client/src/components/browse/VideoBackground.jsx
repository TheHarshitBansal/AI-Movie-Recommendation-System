import useMovieTrailer from "../../hooks/useMovieTrailer.js";

const VideoBackground = ({ id }) => {
  const trailerId = useMovieTrailer({ id });

  return (
    <div className="z-[99]">
      <iframe
        className="w-screen h-screen"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&playlist=${trailerId}&loop=1`}
        allow="autoplay"
        allowFullScreen
        style={{
          pointerEvents: "none",
        }}
      ></iframe>
    </div>
  );
};

export default VideoBackground;
