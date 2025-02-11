import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewStars = ({ rating = 5 }) => {
  const maxStars = 5;

  return (
    <div className="flex text-yellow-400 space-x-1">
      {[...Array(maxStars)].map((_, index) => {
        const starValue = index + 1;
        const isFullStar = rating >= starValue;
        const isHalfStar = rating >= starValue - 0.5 && rating < starValue;

        return (
          <span key={index} className="relative w-5 h-5">
            {/* Full Star */}
            {isFullStar ? (
              <AiFillStar className="absolute w-full h-full" />
            ) : isHalfStar ? (
              // Half Star using SVG Clip
              <span className="relative block w-full h-full">
                <AiFillStar className="absolute w-full h-full text-gray-300" />
                <AiFillStar
                  className="absolute w-full h-full text-yellow-400"
                  style={{ clipPath: "inset(0 50% 0 0)" }} // Clip left half
                />
              </span>
            ) : (
              // Empty Star
              <AiOutlineStar className="absolute w-full h-full" />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default ReviewStars;
