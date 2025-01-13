import MovieContainer from "./MovieContainer.jsx";
import ShowsContainer from "./ShowsContainer.jsx";

const SecondaryContainer = () => {
  return (
    <div className="relative">
      <div className="w-full h-full pt-20 bg-gradient-to-b from-0% from-black to-black8 to-5%">
        <MovieContainer />
        <ShowsContainer />
      </div>
    </div>
  );
};

export default SecondaryContainer;
