import useMovieReviews from "../../hooks/useMovieReviews.js";
import MovieReviewCard from "./MovieReviewCard.jsx";

const MovieReviewContainer = ({ id, show }) => {
  const reviews = useMovieReviews({ id, show });

  if (!reviews) {
    return null;
  }
  return (
    <div className="p-10 flex flex-col gap-y-3 bg-black10 border border-black15 rounded-xl">
      <h1 className="font-medium text-gray60 text-lg">Reviews</h1>
      <div className="flex gap-x-5 overflow-x-scroll  no-scrollbar">
        {reviews.map((review) => (
          <MovieReviewCard
            key={review.id}
            name={review?.author_details.name || review.author}
            content={review.content}
            rating={review?.author_details.rating}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieReviewContainer;
