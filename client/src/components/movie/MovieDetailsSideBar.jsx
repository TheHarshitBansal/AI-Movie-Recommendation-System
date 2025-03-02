import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import TranslateIcon from "@mui/icons-material/Translate";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import GridViewIcon from "@mui/icons-material/GridView";
import useMovieWatchProviders from "../../hooks/useMovieWatchProviders.js";
import ProviderLogo from "./ProviderLogo.jsx";

const MovieDetailsSideBar = ({ movie, show }) => {
  const id = movie.id;
  const streamingPlatforms = useMovieWatchProviders({ id, show });

  return (
    <div className="p-5 md:p-10 flex flex-col items-start justify-start gap-y-3 md:gap-y-5 lg:gap-y-8 bg-black10 border border-black15 rounded-xl h-full">
      {/* //! Release Date */}
      <div className="flex flex-col gap-y-2 md:gap-y-3">
        <div className="text-gray60 font-medium text-sm md:text-base lg:text-lg flex items-center gap-x-1 md:gap-x-2">
          <CalendarMonthIcon />
          <p>Released On</p>
        </div>
        <p className="font-semibold text-xs md:text-sm lg:text-base">
          {show ? movie?.first_air_date : movie?.release_date}
        </p>
      </div>

      {/* //! Languages */}
      <div className="flex flex-col gap-y-2 md:gap-y-3">
        <div className="text-gray60 font-medium text-sm md:text-base lg:text-lg flex items-center gap-x-1 md:gap-x-2">
          <TranslateIcon />
          <p>Available Languages</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {movie?.spoken_languages?.map((language) => (
            <div
              className="bg-black8 border border-black15 py-2 px-3 rounded-lg text-xs md:text-sm lg:text-base"
              key={language?.name}
            >
              {language?.english_name}
            </div>
          ))}
        </div>
      </div>

      {/* //! Genres */}
      <div className="flex flex-col gap-y-2 md:gap-y-3">
        <div className="text-gray60 font-medium text-sm md:text-base lg:text-lg flex items-center gap-x-1 md:gap-x-2">
          <GridViewIcon />
          <p>Genres</p>
        </div>
        <div className="flex gap-1 flex-wrap">
          {movie?.genres?.map((genre) => (
            <div
              className="bg-black8 border border-black15 py-2 px-3 rounded-lg text-xs md:text-sm lg:text-base"
              key={genre?.id}
            >
              {genre?.name}
            </div>
          ))}
        </div>
      </div>

      {/* //! Streaming Companies */}
      {streamingPlatforms && (
        <div className="flex flex-col gap-y-2 md:gap-y-3">
          <div className="text-gray60 font-medium text-sm md:text-base lg:text-lg flex items-center gap-x-1 md:gap-x-2">
            <LiveTvIcon />
            <p>Streaming Platforms</p>
          </div>
          <div className="flex gap-x-1 md:gap-x-2">
            {streamingPlatforms?.flatrate?.map((platform) => (
              <ProviderLogo
                name={platform?.provider_name}
                profile={platform?.logo_path}
                key={platform?.provider_id}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetailsSideBar;
