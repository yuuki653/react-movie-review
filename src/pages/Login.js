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
      <div style={mainStyles}>
        <div style={loginContainerStyle}>
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
        <p>登録していない方は</p>{" "}
        <Link to="/movie/signup">
          <p>新規登録</p>
        </Link>
        <button
          onClick={() => {
            navigate(-1);
          }}
        >
          戻る
        </button>
      </div>
    </>
  );
};

const mainStyles = {
  display: "flex",
  flexWrap: "wrap",
  listStyleType: "none",
  margin: "50px 20px",
  // padding: "0 20px",
  justifyContent: "center",
  gap: "10px",
};

const loginContainerStyle = {
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
  backgroundColor: "#02b43dff",
  color: "white",
  cursor: "pointer",
};

export default Login;
