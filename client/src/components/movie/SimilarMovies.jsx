import useSimilarMovies from "../../hooks/useSimilarMovies";
import PosterCards from "../browse/PosterCards.jsx";
import ShowCards from "../browse/ShowCards.jsx";

const SimilarMovies = ({ id, show }) => {
  const similarMovies = useSimilarMovies({ id, show });
  if (!similarMovies) return null;

  return (
    <div className="p-10 flex flex-col gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-medium text-gray60 text-lg">
        Similar {show ? "Shows" : "Movies"}
      </h1>
      <div className="flex gap-x-5 overflow-scroll no-scrollbar">
        {similarMovies.map((movie) =>
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

export default SimilarMovies;
