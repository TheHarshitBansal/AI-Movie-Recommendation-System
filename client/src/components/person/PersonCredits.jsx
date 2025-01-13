import usePersonCredits from "../../hooks/usePersonCredits.js";
import PosterCards from "../browse/PosterCards.jsx";
import ShowCards from "../browse/ShowCards.jsx";

const PersonCredits = ({ id, show = false }) => {
  const credits = usePersonCredits({ id, show });
  if (!credits) return null;

  return (
    <div className="p-5 lg:p-10 flex flex-col gap-y-2 md:gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-medium text-gray60 text-sm md:text-base lg:text-lg">
        Featured {show ? "Shows" : "Movies"}
      </h1>
      <div className="flex gap-x-2 md:gap-x-3 lg:gap-x-5 overflow-scroll no-scrollbar">
        {credits.map((movie) =>
          !show ? (
            <PosterCards key={movie.id} id={movie.id} />
          ) : (
            <ShowCards key={movie.id} id={movie.id} />
          )
        )}
      </div>
    </div>
  );
};

export default PersonCredits;
