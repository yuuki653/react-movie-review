import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const Header = ({
  query,
  setQuery,
  onSearch,
  showSearch = true,
  showLogin = true,
}) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

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
      <h1 style={leftStyle}>映画レビューアプリ</h1>
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
          <h3 style={rightStyle} onClick={handleLogOut}>
            ログアウト
          </h3>
        ) : (
          <Link to="/movie/login">
            <h3 style={rightStyle}>ログイン</h3>
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
  textAlign: "right",
};

export default Header;
