import StarIcon from "@mui/icons-material/Star";

const MovieReviewCard = ({ name, content, rating }) => {
  return (
    <div className="bg-black6 p-5 lg:p-10 flex flex-col gap-y-2 md:gap-y-3 lg:gap-y-5 rounded-xl border border-black15 h-40 md:h-60 md:min-w-[30%] min-w-[50%]">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-white text-sm md:text-base lg:text-lg">
          {name}
        </h1>
        <div className="flex items-center gap-x-1 md:gap-x-2 text-sm md:text-base lg:text-lg">
          <StarIcon className="text-red45" />
          <span className="text-white">{rating}</span>
        </div>
      </div>
      <p className="text-gray60 text-xs md:text-sm lg:text-base overflow-scroll no-scrollbar">
        {content}
      </p>
    </div>
  );
};

export default MovieReviewCard;
