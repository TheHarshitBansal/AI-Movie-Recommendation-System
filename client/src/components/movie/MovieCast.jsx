import useMovieCast from "../../hooks/useMovieCast.js";
import CastProfileCard from "./CastProfileCard.jsx";

const MovieCast = ({ id, show }) => {
  const credits = useMovieCast({ id, show });

  if (!credits) {
    return <div>Loading...</div>;
  }

  const cast = credits.cast;
  return (
    <div className="p-5 lg:p-10 flex flex-col gap-y-2 md:gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h3 className="font-medium text-gray60 text-sm md:text-base lg:text-lg">
        Cast
      </h3>
      <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5 overflow-scroll no-scrollbar">
        {cast.map((actor) => (
          <CastProfileCard
            key={actor.id}
            name={actor.name}
            profile={actor.profile_path}
            id={actor.id}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieCast;
