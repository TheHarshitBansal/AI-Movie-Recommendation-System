import useMovieTrailer from "../../hooks/useMovieTrailer.js";

const MovieDetailsVideoBackground = ({ id, show }) => {
  const trailerId = useMovieTrailer({ id, show });

  return (
    <div className="z-[99]">
      <iframe
        className="relative w-[calc(100vw-160px)] h-[90vh] rounded-xl"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&mute=1&controls=0&rel=0&showinfo=0&modestbranding=1&iv_load_policy=3&playlist=${trailerId}&loop=1`}
        allow="autoplay"
        allowFullScreen
        style={{
          pointerEvents: "none",
        }}
      ></iframe>
      <div className="absolute top-0 left-0 w-full h-full opacity-100 bg-gradient-to-b from-black/0 from-0% via-black8/70 via-80% to to-black8 to-100%"></div>
    </div>
  );
};

export default MovieDetailsVideoBackground;
