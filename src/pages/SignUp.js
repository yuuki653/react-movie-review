import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("アカウントが作成できました。\nログインしてください。");
      navigate("/movie/login");
    } catch (error) {
      alert("登録に失敗しました：" + error.message);
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
      <button onClick={handleSignUp}>新規登録</button>

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

export default SignUp;
