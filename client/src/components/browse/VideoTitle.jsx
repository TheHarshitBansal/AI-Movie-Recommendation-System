import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const VideoTitle = ({ title, overview, id, trailer }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-center">
      <div className="absolute w-[90vw] bottom-8 space-y-6 text-center flex justify-center items-center flex-col z-10">
        <div>
          <h1 className="font-bold text-3xl">{title}</h1>
          <p className="font-medium text-gray60 text-base">{overview}</p>
        </div>
        {trailer && (
          <button
            onClick={() => {
              navigate(`movie/${id}`);
            }}
            className="text-white flex items-center text-center justify-center text-sm font-semibold px-5 py-3 rounded-lg bg-red45 w-fit hover:bg-opacity-80"
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
