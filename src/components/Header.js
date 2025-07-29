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
    <header>
      <div style={menuContainerStyle}>
        {showLogin &&
          (user ? (
            <div style={menuStyle}>
              <span style={logOutBtn} onClick={handleLogOut}>
                ログアウト
              </span>
              <Link to="/movie/favorite" style={favoriteBtn}>
                <span>お気に入り一覧</span>
              </Link>
            </div>
          ) : (
            <div style={menuStyle}>
              <Link to="/movie/login" style={loginBtn}>
                <span>ログイン</span>
              </Link>
              <Link to="/movie/signUp" style={signUpBtn}>
                <span>新規登録</span>
              </Link>
            </div>
          ))}
      </div>
      <div style={titeleContainerStyle}>
        <span style={titleStyle}>映画レビューアプリ</span>
        {showSearch && (
          <div style={searchStyle}>
            <input
              type="text"
              style={inputStyle}
              placeholder="映画を検索"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onSearch();
                }
              }}
            />
            <button style={buttonStyle} onClick={onSearch}>
              検索
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const menuContainerStyle = {
  backgroundColor: "#2e2e2eff",
  height: "25px",
};

const menuStyle = {
  display: "flex",
  justifyContent: "flex-end",
  color: "#ffffff",
  padding: "0 10px",
  height: "25px",
  gap: "10px",
  alignItems: "center",
};

const titeleContainerStyle = {
  display: "flex",
  padding: "10px",
  alignItems: "center",
  backgroundColor: "#fff",
  color: "#363636ff",
  flexWrap: "wrap",
  gap: "15px",
  boxShadow: "0 3px 10px 0 #b6b6b6ff",
};

const titleStyle = {
  color: "#2e2e2eff",
  margin: "0",
  fontSize: "20px",
  fontWeight: "bold",
  minWidth: "200px",
};

const searchStyle = {
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  gap: "5px",
  minWidth: "250px",
};

const inputStyle = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "200px",
  maxWidth: "100%",
};

const buttonStyle = {
  padding: "8px 16px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#007bff",
  color: "white",
  cursor: "pointer",
};

const loginBtn = {
  color: "#2e2e2eff",
  backgroundColor: "#dad6d6ff",
  cursor: "pointer",
  textAlign: "center",
  height: "25px",
  display: "flex",
  alignItems: "center",
  padding: "0 5px",
  margin: "0",
  fontSize: "14px",
  textDecoration: "none",
};

const signUpBtn = {
  color: "#2e2e2eff",
  backgroundColor: "#dad6d6ff",
  cursor: "pointer",
  textAlign: "center",
  height: "25px",
  display: "flex",
  alignItems: "center",
  padding: "0 5px",
  margin: "0",
  fontSize: "14px",
  textDecoration: "none",
};

const logOutBtn = {
  color: "#000000",
  backgroundColor: "#dad6d6ff",
  cursor: "pointer",
  textAlign: "center",
  height: "25px",
  display: "flex",
  alignItems: "center",
  padding: "0 5px",
  margin: "0",
  fontSize: "14px",
};

const favoriteBtn = {
  color: "#000000",
  backgroundColor: "#dad6d6ff",
  height: "25px",
  display: "flex",
  alignItems: "center",
  margin: "0",
  padding: "0 5px",
  fontSize: "14px",
  cursor: "pointer",
  textDecoration: "none",
};

export default Header;
