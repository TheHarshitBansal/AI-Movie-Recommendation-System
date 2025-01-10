import { useParams } from "react-router-dom";
import useShowDetails from "../hooks/useShowDetails.js";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import MovieSecondary from "../components/movie/MovieSecondary.jsx";
import ShowMain from "../components/show/ShowMain.jsx";
import Loader from "../components/Loader.jsx";

const ShowDetails = () => {
  const { showId } = useParams();

  const show = useShowDetails(showId);
  if (!show) {
    return <Loader />;
  }

  return (
    <div className="relative text-white w-full h-full">
      <Header />
      <div className="relative mx-20">
        <ShowMain show={show} />
        <MovieSecondary movie={show} show />
      </div>
      <Footer />
    </div>
  );
};

export default ShowDetails;
