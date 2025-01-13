import { IMAGE_URL } from "../../utils/constants.js";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const EpisodeCards = ({ episode }) => {
  const imgSrc = IMAGE_URL + episode.still_path;
  return (
    <div className="bg-transparent border-t border-black15 py-5 lg:py-10 flex flex-col gap-y-2 md:gap-y-3 md:flex-row items-center justify-between gap-x-2 md:gap-x-3 lg:gap-x-5">
      <div className="flex gap-x-2 md:gap-x-3 items-center justify-start">
        {/* //! Episode Number */}
        <span className="font-semibold text-gray60 text-sm md:text-base lg:text-lg">
          {episode.episode_number}
        </span>

        {/* //! Episode Image */}
        <div className="relative h-fit">
          <img
            src={imgSrc}
            alt={episode.name}
            className="relative rounded-xl w-52 z-0"
          />
          <div className="absolute top-0 left-0 bg-black/40 w-full h-full z-10 rounded-xl flex items-center justify-center">
            <div className="bg-black/60 p-2 rounded-full">
              <PlayCircleOutlineIcon />
            </div>
          </div>
        </div>
      </div>

      {/* //! Episode Name */}
      <div className="flex flex-col gap-y-2 justify-start w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-semibold text-sm md:text-base lg:text-lg">
            {episode.name}
          </h1>
          <span className="flex items-center gap-x-1 bg-black8 border border-black15 p-1 rounded-md !text-xs md:!text-sm font-medium text-gray60">
            <AccessTimeIcon fontSize="small" />
            {episode.runtime}mins
          </span>
        </div>
        <p className="font-normal text-xs md:text-sm lg:text-base text-gray60">
          {episode.overview}
        </p>
      </div>
    </div>
  );
};

export default EpisodeCards;
