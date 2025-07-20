import React from "react";

const ReviewForm = ({ review, setReview, onAddReview }) => {
  return (
    <>
      <input
        type="text"
        value={review}
        placeholder="レビューを投稿"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <button onClick={onAddReview}>投稿</button>
    </>
  );
};

export default ReviewForm;
