import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("ログインしました");
      navigate("/");
    } catch (error) {
      alert("ログインできませんでした：" + error.message);
    }
  };

  return (
    <>
      <Header showSearch={false} showLogin={false} />

      <div style={loginContainerStyle}>
        <p style={loginTextStyle}>ログイン</p>
        <hr style={borderStyle} />
        <div style={inputContainerStyle}>
          <input
            style={inputStyle}
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button style={buttonStyle} onClick={handleLogin}>
            ログイン
          </button>
        </div>
        <p style={signUpStyle}>
          登録していない方は
          <span>
            <Link to="/movie/signup" style={signUpButtonStyle}>
              新規登録
            </Link>
          </span>
        </p>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
      >
        戻る
      </button>
    </>
  );
};

const loginContainerStyle = {
  textAlign: "center",
  minWidth: "250px",
  margin: "50px 20px",
};

const loginTextStyle = {
  margin: "10px 0 0 0",
  fontWeight: "bold",
  fontSize: "20px",
};

const borderStyle = {
  border: "2px solid #00ff55ff",
  width: "200px",
  margin: "3px auto 20px auto",
};

const inputContainerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "40px",
  gap: "10px",
};

const inputStyle = {
  padding: "8px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  width: "250px",
  maxWidth: "100%",
};

const buttonStyle = {
  marginTop: "20px",
  padding: "8px 16px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#02b43dff",
  color: "white",
  width: "100px",
  cursor: "pointer",
};

const signUpStyle = {
  marginTop: "60px",
};

const signUpButtonStyle = {
  marginLeft: "5px",
  padding: "8px 16px",
  fontSize: "16px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#ff5e00ff",
  color: "white",
  width: "100px",
  textDecoration: "none",
  cursor: "pointer",
};

export default Login;
