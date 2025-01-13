import EpisodeContainer from "./EpisodeContainer.jsx";

const SeasonContainer = ({ season }) => {
  return (
    <div className="p-5 lg:p-10 flex flex-col gap-y-2 md:gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-semibold lg:text-xl md:text-lg text-base mb-3 lg:mb-5">
        Seasons and Episodes
      </h1>
      {season.map((s) => (
        <EpisodeContainer
          key={s.id}
          name={s.name}
          ep={s.episode_count}
          number={s.season_number}
        />
      ))}
    </div>
  );
};

export default SeasonContainer;
