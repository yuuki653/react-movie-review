import React from "react";

const ReviewCard = ({ review }) => {
  return (
    <li key={review.id} style={cardStyle}>
      <div style={reviewStyle}>
        <div>投稿者：{review.userName}</div>
        <hr />
        <div>{review.text}</div>
      </div>
    </li>
  );
};

const cardStyle = {
  backgroundColor: "#fde2fdff",
  border: "1px solid #5f5f5fff",
  marginTop: "10px",
  borderRadius: "10px",
};

const reviewStyle = {
  margin: "10px auto",
  width: "95%",
};

export default ReviewCard;
