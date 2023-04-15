import React, { useState } from 'react';
import Star from '../Star';

const StarRating = ({ onRate }) => {
  const [rating, setRating] = useState(0);

  const handleClick = (value) => {
    setRating(value);
    onRate(value);
  };

  return (
    <div>
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;

        return (
          <Star
            key={i}
            filled={ratingValue <= rating}
            onClick={() => handleClick(ratingValue)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
