import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.js";
import UserAvatar from "./UserAvatar.js";

const ReviewCard = ({ review, onEdit, onDelete }) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const isMyReview = user && user.uid === review.userId;

  const reviewDate = (timestamp) => {
    if (!timestamp) return "";

    if (timestamp.toDate) {
      return timestamp.toDate().toLocaleDateString("ja-JP");
    }
  };

  const handleSave = () => {
    onEdit(review.id, editText);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(review.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(review.id);
  };

  return (
    <li className="mt-2 mx-auto">
      <div className="w-[90%] mx-auto">
        <div className="flex items-center text-xs gap-5">
          <span className="flex items-center gap-2">
            <UserAvatar userName={review.userName} />
            <span>{review.userName}</span>
          </span>
          <span>[{reviewDate(review.createdAt)}]</span>
        </div>

        {/* レビュー内容 */}
        {isEditing ? (
          <div className="my-1">
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="resize-none w-full md:w-80 h-16 p-2 border border-gray-500 rounded mb-2 focus:outline-none focus:border-purple-400"
            />
            <div className="flex text-xs gap-5">
              <span
                className="text-purple-600 hover:text-purple-700 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={handleSave}
              >
                保存
              </span>
              <span
                className="text-red-600 hover:text-red-700 hover:bg-gray-200 transition-colors cursor-pointer"
                onClick={handleCancel}
              >
                キャンセル
              </span>
            </div>
          </div>
        ) : (
          <div className="my-1 text-lg">{review.text}</div>
        )}

        {/* 自分のレビューに表示 */}
        {isMyReview && !isEditing && (
          <div className="flex text-xs gap-5">
            <span
              className="text-purple-600 hover:text-purple-700 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              編集
            </span>
            <span
              className="text-red-600 hover:text-red-700 hover:bg-gray-200 transition-colors cursor-pointer"
              onClick={handleDelete}
            >
              削除
            </span>
          </div>
        )}
      </div>
      <hr className="border-1 border-purple-300 mx-auto my-5" />
    </li>
  );
};

export default ReviewCard;
