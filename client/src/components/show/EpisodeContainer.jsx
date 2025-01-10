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
    <div className="px-10 py-5 bg-black6 rounded-xl border border-black15 flex flex-col gap-y-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <h1 className="font-semibold text-xl">{name}</h1>
          <span className="text-gray60 font-medium text-base">
            {ep} Episodes
          </span>
        </div>
        <button onClick={() => setShowEpisodes(!showEpisodes)}>
          {showEpisodes ? (
            <ExpandLessIcon fontSize="large" />
          ) : (
            <ExpandMoreIcon fontSize="large" />
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
