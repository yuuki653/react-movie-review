import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews, onEdit, onDelete }) => {
  return (
    <>
      <p className="mt-3 text-center">レビュー一覧</p>
      <hr className="border-1 border-purple-300 mx-auto mt-1 mb-5" />
      <ul>
        {reviews.length > 0 ? (
          reviews.map((review) => {
            return (
              <ReviewCard
                key={review.id}
                review={review}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })
        ) : (
          <p className="text-center text-gray-600 text-lg mt-8">
            レビューはありません
          </p>
        )}
      </ul>
    </>
  );
};

export default ReviewList;
