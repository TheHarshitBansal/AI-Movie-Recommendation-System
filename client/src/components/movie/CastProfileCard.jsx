import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../../utils/constants.js";

const CastProfileCard = ({ name, profile, id }) => {
  const navigate = useNavigate();

  if (!profile) {
    return null;
  }

  const imgUrl = IMAGE_URL + profile;

  return (
    <div
      className="bg-black8 rounded-xl h-[100px] min-w-[100px] hover:cursor-pointer"
      onClick={() => navigate(`/person/${id}`)}
    >
      <img
        src={imgUrl}
        alt={name}
        className="object-cover w-[100px] h-[100px] rounded-xl"
      />
    </div>
  );
};

export default CastProfileCard;
