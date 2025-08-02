import React from "react";

const ReviewCard = ({ review }) => {
  const reviewDate = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("ja-JP");
    }
  };
  return (
    <li style={reviewContainerStyle}>
      <div style={reviewCardStyle}>
        <div style={nameContainerStyle}>
          <span>投稿者：{review.userName}</span>
          <span>[{reviewDate(review.createdAt)}]</span>
        </div>
        <div style={reviewTextStyle}>{review.text}</div>
        <div style={editContainerStyle}>
          <span>編集</span>
          <span>削除</span>
        </div>
      </div>
      <hr style={borderStyle} />
    </li>
  );
};

const reviewContainerStyle = {
  marginTop: "10px",
  margin: "10px auto",
};

const reviewCardStyle = {
  width: "90%",
  margin: "0 auto",
};

const nameContainerStyle = {
  display: "flex",
  fontSize: "12px",
  gap: "20px",
};

const editContainerStyle = {
  display: "flex",
  fontSize: "12px",
  gap: "20px",
};

const reviewTextStyle = {
  fontSize: "18px",
  margin: "5px 0 5px 0",
};

const borderStyle = {
  border: "1px solid #ecd0ffff",
  margin: "20px auto",
};

export default ReviewCard;
