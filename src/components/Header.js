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
      <div style={menuBarStyle}>
        <div style={menuContainerStyle}>
          <Link to="/" style={homeButton}>
            <span>ホーム</span>
          </Link>
          {showLogin &&
            (user ? (
              <div style={menuStyle}>
                {/* <span> */}
                <span style={logOutButton} onClick={handleLogOut}>
                  ログアウト
                </span>
                <Link to="/movie/favorite" style={favoriteButton}>
                  <span>お気に入り一覧</span>
                </Link>
                {/* </span> */}
              </div>
            ) : (
              <div style={menuStyle}>
                <Link to="/movie/login" style={loginButton}>
                  <span>ログイン</span>
                </Link>
                <Link to="/movie/signUp" style={signUpButton}>
                  <span>新規登録</span>
                </Link>
              </div>
            ))}
        </div>
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

const menuBarStyle = {
  backgroundColor: "#2e2e2eff",
  height: "25px",
};

const menuContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  margin: "0 auto",
  width: "90%",
  fontWeight: "bold",
};

const homeButton = {
  color: "#2e2e2eff",
  backgroundColor: "#fd8d8dff",
  height: "25px",
  display: "flex",
  alignItems: "center",
  padding: "0 5px",
  fontSize: "14px",
  cursor: "pointer",
  textDecoration: "none",
};

const menuStyle = {
  display: "flex",
  height: "25px",
  gap: "10px",
  alignItems: "center",
};

const loginButton = {
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

const signUpButton = {
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

const logOutButton = {
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
};

const favoriteButton = {
  color: "#2e2e2eff",
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

const titeleContainerStyle = {
  display: "flex",
  padding: "10px",
  alignItems: "center",
  backgroundColor: "#fff",
  color: "#363636ff",
  height: "80px",
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

export default Header;
