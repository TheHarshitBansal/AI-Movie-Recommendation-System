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
      className="bg-black8 rounded-xl h-[40px] min-w-[40px] md:h-[60px] md:min-w-[60px] lg:h-[100px] lg:min-w-[100px] hover:cursor-pointer"
      onClick={() => navigate(`/person/${id}`)}
    >
      <img
        src={imgUrl}
        alt={name}
        className="object-cover h-[40px] min-w-[40px] md:h-[60px] md:min-w-[60px] lg:h-[100px] lg:min-w-[100px] rounded-xl"
      />
    </div>
  );
};

export default CastProfileCard;
