import { IMAGE_URL } from "../../utils/constants.js";

const Poster = ({ url, width }) => {
  const imgUrl = IMAGE_URL + url;

  // If the URL is null or undefined, return null
  if (!url) return null;

  return (
    <div className="relative h-fit" style={{ maxWidth: `${width}px` }}>
      <img
        src={imgUrl}
        alt="Movie"
        className="rounded-xl h-fit"
        style={{ maxWidth: `${width}px` }}
      />
    </div>
  );
};

export default Poster;
