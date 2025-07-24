import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  return (
    <ul style={listStyle}>
      {reviews.map((review) => {
        return <ReviewCard review={review} />;
      })}
    </ul>
  );
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
};

export default ReviewList;
