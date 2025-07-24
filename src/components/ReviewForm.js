import React from "react";

const ReviewForm = ({ review, setReview, onAddReview }) => {
  return (
    <form onSubmit={onAddReview} style={reviewFormStyle}>
      <textarea
        value={review}
        placeholder="レビューを投稿"
        style={textareaStyle}
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <button type="submit" style={buttonStyle}>
        投稿
      </button>
    </form>
  );
};

const reviewFormStyle = {
  display: "flex",
  flexDirection: "column",
  width: "fit-content",
};

const textareaStyle = {
  resize: "none",
  width: "500px",
  height: "70px",
};

const buttonStyle = {
  width: "auto",
  alignSelf: "flex-end",
};

export default ReviewForm;
