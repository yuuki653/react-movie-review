import React from "react";

const ReviewForm = ({ review, setReview, onAddReview }) => {
  return (
    <form
      onSubmit={onAddReview}
      className="mb-10 flex flex-col items-center md:items-start"
    >
      <textarea
        value={review}
        placeholder="レビューを投稿"
        className="resize-none w-full md:w-80 h-16 p-2 border border-gray-500 rounded mb-2 focus:outline-none focus:border-blue-400"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded font-medium transition-colors"
      >
        投稿
      </button>
    </form>
  );
};

export default ReviewForm;
