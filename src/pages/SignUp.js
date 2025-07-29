import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import Header from "../components/Header";

const SignUp = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      alert("アカウントが作成できました。\nログインしてください。");
      navigate("/movie/login");
    } catch (error) {
      alert("登録に失敗しました：" + error.message);
    }
  };

  return (
    <>
      <Header showSearch={false} showLogin={false} />
      <div style={mainStyles}>
        <form style={signUpContainerStyle} onSubmit={handlesubmit}>
          <input
            style={inputStyle}
            type="name"
            placeholder="名前（表示名）"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button style={buttonStyle} type="submit">
            新規登録
          </button>
        </form>
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

const mainStyles = {
  // display: "flex",
  // flexWrap: "wrap",
  margin: "50px 20px",
  // justifyContent: "center",
  gap: "10px",
};

const signUpContainerStyle = {
  // textAlign: "center",
  // display: "flex",
  // justifyContent: "center",
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
  backgroundColor: "#ff5e00ff",
  color: "white",
  cursor: "pointer",
};

export default SignUp;
