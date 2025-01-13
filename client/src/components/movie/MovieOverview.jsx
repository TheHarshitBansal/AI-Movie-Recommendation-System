const MovieOverview = ({ desc }) => {
  return (
    <div className="w-full p-5 lg:p-10 bg-black10 border border-black15 rounded-xl flex flex-col gap-y-2 md:gap-y-3">
      <h3 className="font-medium text-gray60 text-sm md:text-base lg:text-lg">
        Overview
      </h3>
      <p className="font-medium text-xs md:text-sm lg:text-base max-h-[50vh] overflow-y-scroll no-scrollbar">
        {desc}
      </p>
    </div>
  );
};

export default MovieOverview;
