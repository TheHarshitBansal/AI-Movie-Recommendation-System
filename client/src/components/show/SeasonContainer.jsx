import EpisodeContainer from "./EpisodeContainer.jsx";

const SeasonContainer = ({ season }) => {
  return (
    <div className="p-10 flex flex-col gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-semibold text-xl mb-5">Seasons and Episodes</h1>
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
