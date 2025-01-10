import { IMAGE_URL } from "../../utils/constants.js";
import useShowDetails from "../../hooks/useShowDetails.js";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { useNavigate } from "react-router-dom";

const ShowCards = ({ id }) => {
  const showDetails = useShowDetails(id);

  const navigate = useNavigate();

  // Add a fallback check for movieDetails
  if (!showDetails) {
    return null; // Or any loading placeholder
  }

  const { number_of_seasons, poster_path } = showDetails;
  const imgUrl = IMAGE_URL + poster_path;

  if (!poster_path) return null;

  return (
    <div
      onClick={() => navigate(`/browse/show/${id}`)}
      className="p-4 bg-black10 border border-black15 rounded-xl min-w-fit w-fit hover:cursor-pointer"
    >
      <div>
        <img
          src={imgUrl}
          alt="Show"
          className={`rounded-xl w-[190px] min-w-[190px] object-cover`}
        />
      </div>
      <div className="mt-4 flex items-center justify-center text-gray60 text-xs font-medium">
        <span className="flex items-center gap-x-1 bg-black8 border border-black15 rounded-full p-2">
          <SubscriptionsIcon fontSize="small" />
          {number_of_seasons} Season
        </span>
      </div>
    </div>
  );
};

export default ShowCards;
