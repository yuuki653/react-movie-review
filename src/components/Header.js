import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext.js";
import UserAvatar from "./UserAvatar.js";

const Header = ({ query, setQuery, onSearch, showSearch = true }) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const { user } = useAuth();

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("ログアウトしました");
      navigate("/");
    } catch (error) {
      alert("ログアウトに失敗しました：" + error.message);
    }
  };

  return (
    <header>
      <div className="bg-gray-800 h-6">
        <div className="flex justify-between w-[90%] mx-auto">
          <Link
            to="/"
            className="bg-red-400 hover:bg-red-500 transition-colors text-gray-800 text-sm font-bold text-center flex items-center cursor-pointer h-6 px-1 "
          >
            <span>ホーム</span>
          </Link>
          {user ? (
            <div className="flex items-center h-6 gap-2">
              <UserAvatar userName={user.displayName} />
              <span
                className="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 text-sm font-bold text-center flex items-center cursor-pointer h-6 px-1 "
                onClick={handleLogOut}
              >
                ログアウト
              </span>
              <Link
                to="/movie/favorite"
                className="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 text-sm font-bold text-center flex items-center cursor-pointer h-6 px-1 "
              >
                <span>お気に入り一覧</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center h-6 gap-2">
              <Link
                to="/movie/login"
                className="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 text-sm font-bold text-center flex items-center cursor-pointer h-6 px-1 "
              >
                <span>ログイン</span>
              </Link>
              <Link
                to="/movie/signUp"
                className="bg-gray-300 hover:bg-gray-400 transition-colors text-gray-800 text-sm font-bold text-center flex items-center cursor-pointer h-6 px-1 "
              >
                <span>新規登録</span>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center min-h-20 py-4 gap-2 shadow-md">
        <h1 className="min-w-56 mx-2 text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          🎬 Movie Review
        </h1>
        {showSearch && (
          <div className="flex justify-center gap-1 min-w-80">
            <input
              type="text"
              className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-blue-600"
              placeholder="映画を検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
            <button
              className="px-4 py-2 rounded font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white"
              onClick={onSearch}
            >
              検索
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
