import { useNavigate } from "react-router-dom";
import { IMAGE_URL } from "../utils/constants.js";

const SearchResultCard = ({ result }) => {
  const navigate = useNavigate();

  const url =
    result?.media_type !== "person"
      ? result?.poster_path
      : result?.profile_path;
  const imgUrl = IMAGE_URL + url;
  if (!imgUrl) {
    return null;
  }

  const handleClick = () => {
    if (result?.media_type === "person") {
      navigate(`/person/${result?.id}`);
    } else if (result?.media_type === "tv") {
      navigate(`/browse/show/${result?.id}`);
    } else {
      navigate(`/browse/movie/${result?.id}`);
    }
  };

  return (
    <div
      className="flex items-center gap-x-5 p-2 border-b border-black15 w-full hover:cursor-pointer"
      onClick={handleClick}
    >
      <img src={imgUrl} alt={result?.title} className="w-12 rounded-lg" />
      <div className="flex flex-col">
        <p className=" font-medium text-lg">{result?.title || result?.name}</p>
        <span className="capitalize text-gray60 text-base">
          {result?.media_type}
        </span>
      </div>
    </div>
  );
};

export default SearchResultCard;
