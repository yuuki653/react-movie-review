import React from "react";
import { useAuth } from "../context/AuthContext.js";
import UserAvatar from "./UserAvatar";

const ReviewForm = ({ review, setReview, onAddReview }) => {
  const { user } = useAuth();

  return (
    <form
      onSubmit={onAddReview}
      className="mb-10 flex flex-col items-center md:items-start gap-2"
    >
      {user && (
        <div className="flex items-center gap-2">
          <UserAvatar userName={user.displayName || "匿名"} />
          <span>{user.displayName || "匿名"}</span>
        </div>
      )}
      <textarea
        value={review}
        placeholder="レビューを投稿"
        className="resize-none w-full md:w-80 h-16 p-2 border border-gray-500 rounded focus:outline-none focus:border-purple-400"
        onChange={(e) => {
          setReview(e.target.value);
        }}
      />
      <button
        type="submit"
        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded font-medium transition-colors"
      >
        投稿
      </button>
    </form>
  );
};

export default ReviewForm;
