import React from "react";

const ReviewForm = ({ review, setReview, onAddReview }) => {
  return (
    <form onSubmit={onAddReview}>
      <textarea
        value={review}
        placeholder="レビューを投稿"
        onChange={(e) => {
          setReview(e.target.value);
        }}
        rows={4}
      />
      <button type="submit">投稿</button>
    </form>
  );
};

export default ReviewForm;
