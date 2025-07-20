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
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>ログイン</button>
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
    </>
  );
};

export default Login;
