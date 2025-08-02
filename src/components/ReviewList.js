import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {
  return (
    <>
      <p style={reviewTextStyle}>レビュー一覧</p>
      <hr style={borderStyle} />
      <ul style={listStyle}>
        {reviews.map((review) => {
          return <ReviewCard key={review.id} review={review} />;
        })}
      </ul>
    </>
  );
};

const reviewTextStyle = {
  margin: "10px 0 0 0",
  textAlign: "center",
  fontSize: "16px",
};

const borderStyle = {
  border: "1px solid #ecd0ffff",
  margin: "3px auto 20px auto",
};

const listStyle = {
  listStyleType: "none",
  padding: "0",
};

export default ReviewList;
