import React from "react";

const ReviewCard = ({ review }) => {
  const reviewDate = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("ja-JP");
    }
  };
  return (
    <li style={cardStyle}>
      <div style={reviewStyle}>
        <div style={nameAndDateStyle}>
          <span>投稿者：{review.userName}</span>
          <span>{reviewDate(review.createdAt)}</span>
        </div>
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

const nameAndDateStyle = {
  display: "flex",
  justifyContent: "space-between",
};

const reviewStyle = {
  margin: "10px auto",
  width: "95%",
};

export default ReviewCard;
