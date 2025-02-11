import ReviewStars from "./ReviewStars";
import Stars from "./Stars";

const SingleReview = ({ reviewText, reviewer, date, rating }) => {
  return (
    <figure className="border p-4 rounded-lg shadow-sm">
      <header className="sm:flex sm:items-center">
        <ReviewStars rating={rating} />
        <p className="mt-2 font-medium sm:ml-4 sm:mt-0">{reviewText}</p>
      </header>

      <p className="mt-2 text-gray-700">{reviewText}</p>

      <figcaption className="mt-4 text-xs text-gray-500">
        {reviewer} - {date}
      </figcaption>
    </figure>
  );
};

export default SingleReview;
