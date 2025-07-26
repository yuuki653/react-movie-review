import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuth } from "../context/AuthContext.js";

const Header = ({
  query,
  setQuery,
  onSearch,
  showSearch = true,
  showLogin = true,
}) => {
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
    <header style={headerStyle}>
      <Link to="/">
        <h2 style={leftStyle}>映画レビューアプリ</h2>
      </Link>
      {showSearch && (
        <div style={centerStyle}>
          <input
            type="text"
            placeholder="映画を検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onSearch();
              }
            }}
          />
          <button onClick={onSearch}>検索</button>
        </div>
      )}
      {showLogin &&
        (user ? (
          <div style={rightStyle}>
            <h3 style={logOutBtn} onClick={handleLogOut}>
              ログアウト
            </h3>
            <Link to="/movie/favorite">
              <h3 style={favoriteBtn}>お気に入り一覧</h3>
            </Link>
          </div>
        ) : (
          <Link to="/movie/login" style={{ textDecoration: "none" }}>
            <h3 style={{ ...rightStyle, ...loginBtn }}>ログイン</h3>
          </Link>
        ))}
    </header>
  );
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "20px",
  alignItems: "center",
  backgroundColor: "#fdfdd6ff",
  color: "#363636ff",
};

const leftStyle = {
  flex: "1",
  textAlign: "left",
  margin: "0",
};

const centerStyle = {
  flex: "2",
  textAlign: "center",
};

const rightStyle = {
  flex: "1",
  flex: "none",
  textAlign: "right",
};

const loginBtn = {
  color: "#fff",
  backgroundColor: "#eb6100",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "10px",
  width: "130px",
  height: "35px",
  textDecoration: "none",
};

const logOutBtn = {
  color: "#fff",
  backgroundColor: "#128a02ff",
  cursor: "pointer",
  textAlign: "center",
  borderRadius: "10px",
  width: "130px",
  height: "35px",
};

const favoriteBtn = {
  color: "pink",
};

export default Header;
