import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, id, trailer }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="absolute w-[90vw] bottom-8 space-y-6 text-center flex justify-center items-center flex-col z-10">
        <div>
          <h1 className="font-bold text-xl md:text-2xl lg:text-3xl">{title}</h1>
          <p className="font-medium text-gray60 text-xs md:text-sm lg:text-base line-clamp-6 md:line-clamp-5 lg:line-clamp-4">
            {overview}
          </p>
        </div>
        {trailer && (
          <button
            onClick={() => {
              navigate(`movie/${id}`);
            }}
            className="text-white flex items-center text-center justify-center text-xs lg:text-sm font-semibold px-3 py-2 lg:px-5 lg:py-3 rounded-lg bg-red45 w-fit hover:bg-opacity-80"
          >
            <span className="me-1">
              <InfoIcon fontSize="medium" />
            </span>
            More Details
          </button>
        )}
      </div>
    </div>
  );
};

export default VideoTitle;
