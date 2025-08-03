import React from "react";

const UserAvatar = ({ userName }) => {
  const getInitial = (name) => {
    if (!name || name === "匿名") return "?";
    return name.charAt(0).toUpperCase();
  };

  const getBackgroundColor = (name) => {
    if (!name) return "bg-gray-400";

    const colors = [
      "bg-red-400",
      "bg-orange-400",
      "bg-yellow-400",
      "bg-green-400",
      "bg-blue-400",
      "bg-indigo-400",
      "bg-purple-400",
      "bg-pink-400",
    ];

    const colorIndex = name.charCodeAt(0) % colors.length;
    return colors[colorIndex];
  };

  const initial = getInitial(userName);
  const bgColor = getBackgroundColor(initial);

  return (
    <span
      className={`${bgColor} h-5 w-5 rounded-full flex items-center justify-center text-white font-bold text-sm`}
    >
      {initial}
    </span>
  );
};

export default UserAvatar;
