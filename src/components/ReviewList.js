import React from "react";

const ReviewList = ({ reviews }) => {
  return (
    <ul>
      {reviews.map((review) => {
        return (
          <li key={review.id}>
            {review.text}（{review.userName}）
          </li>
        );
      })}
    </ul>
  );
};

export default ReviewList;
