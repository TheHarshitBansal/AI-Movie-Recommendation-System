import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import MovieMain from "../components/movie/MovieMain.jsx";
import useMovieDetails from "../hooks/useMovieDetails.js";
import MovieSecondary from "../components/movie/MovieSecondary.jsx";
import Loader from "../components/Loader.jsx";

const MovieDetails = () => {
  const { movieId } = useParams();

  const movie = useMovieDetails(movieId);
  if (!movie) {
    return <Loader />;
  }

  return (
    <div className="relative text-white w-full h-full">
      <Header />
      <div className="relative mx-20">
        <MovieMain movie={movie} />
        <MovieSecondary movie={movie} show={false} />
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
