import { IMAGE_URL } from "../../utils/constants.js";
import useMovieDetails from "../../hooks/useMovieDetails.js";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "primereact/skeleton";

const PosterCards = ({ id }) => {
  const movieDetails = useMovieDetails(id);
  const navigate = useNavigate();

  if (!movieDetails) {
    return <Skeleton width="200px" height="400px"></Skeleton>;
  }

  const { vote_average, runtime, poster_path } = movieDetails;

  if (!poster_path) return null;

  const imgUrl = IMAGE_URL + poster_path;

  return (
    <div
      onClick={() => navigate(`/browse/movie/${id}`)}
      className="p-4 bg-black10 border border-black15 rounded-xl min-w-fit w-fit cursor-pointer"
    >
      <div>
        <img
          src={imgUrl}
          alt="Movie"
          className={`rounded-xl w-[190px] min-w-[190px] object-cover`}
        />
      </div>
      <div className="mt-4 flex items-center justify-between text-gray60 text-xs font-medium">
        <span className="flex items-center gap-x-1 bg-black8 border border-black15 rounded-full p-2">
          <AccessTimeIcon fontSize="small" />
          {Math.floor(runtime / 60) + "h " + Math.floor(runtime % 60) + "min "}
        </span>
        <span className="flex items-center gap-x-1 bg-black8 border border-black15 rounded-full p-2">
          <StarBorderIcon fontSize="small" />
          {vote_average.toFixed(1)}
        </span>
      </div>
    </div>
  );
};

export default PosterCards;
