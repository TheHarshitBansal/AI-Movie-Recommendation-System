const MovieOverview = ({ desc }) => {
  return (
    <div className="w-full p-10 bg-black10 border border-black15 rounded-xl flex flex-col gap-y-3">
      <h3 className="font-medium text-gray60 text-lg">Overview</h3>
      <p className="font-medium text-lg">{desc}</p>
    </div>
  );
};

export default MovieOverview;
