import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import EpisodeCards from "./EpisodeCards.jsx";
import useEpisodeDetails from "../../hooks/useEpisodeDetails.js";
import { useParams } from "react-router-dom";

const EpisodeContainer = ({ name, ep, number }) => {
  const [showEpisodes, setShowEpisodes] = useState(false);
  const { showId } = useParams();
  const epDetails = useEpisodeDetails({ showId, number });
  if (!epDetails) return null;
  console.log(epDetails);

  return (
    <div className="px-6 md:px-8 py-3 lg:px-10 lg:py-5 bg-black6 rounded-xl border border-black15 flex flex-col gap-y-4 md:gap-y-6 lg:gap-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2 lg:gap-x-4">
          <h1 className="font-semibold text-sm md:text-base lg:text-lg">
            {name}
          </h1>
          <span className="text-gray60 font-medium text-xs md:text-sm lg:text-base">
            {ep} Episodes
          </span>
        </div>
        <button onClick={() => setShowEpisodes(!showEpisodes)}>
          {showEpisodes ? (
            <>
              <ExpandLessIcon fontSize="small" className="md:!hidden" />
              <ExpandLessIcon
                fontSize="medium"
                className="!hidden md:!block lg:!hidden"
              />
              <ExpandLessIcon fontSize="large" className="!hidden lg:!block" />
            </>
          ) : (
            <>
              <ExpandMoreIcon fontSize="small" className="md:!hidden" />
              <ExpandMoreIcon
                fontSize="medium"
                className="!hidden md:!block lg:!hidden"
              />
              <ExpandMoreIcon fontSize="large" className="!hidden lg:!block" />
            </>
          )}
        </button>
      </div>
      {showEpisodes && (
        <div>
          {epDetails.map((episode) => (
            <EpisodeCards
              key={episode.id}
              episode={episode}
              showEpisodes={showEpisodes}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EpisodeContainer;
