import StarIcon from "@mui/icons-material/Star";

const MovieReviewCard = ({ name, content, rating }) => {
  return (
    <div className="bg-black6 p-10 flex flex-col gap-y-5 rounded-xl border border-black15 h-60 min-w-[30%]">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-white text-xl">{name}</h1>
        <div className="flex items-center gap-x-2">
          <StarIcon className="text-red45" />
          <span className="text-white text-xl">{rating}</span>
        </div>
      </div>
      <p className="text-gray60 text-lg overflow-scroll no-scrollbar">
        {content}
      </p>
    </div>
  );
};

export default MovieReviewCard;
