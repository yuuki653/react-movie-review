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

      <form style={signUpContainerStyle} onSubmit={handlesubmit}>
        <p style={signUpTextStyle}>新規登録</p>
        <hr style={borderStyle} />
        <div style={inputContainerStyle}>
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
        </div>
      </form>

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

const signUpContainerStyle = {
  textAlign: "center",
  minWidth: "250px",
  margin: "50px 20px",
};

const signUpTextStyle = {
  margin: "10px 0 0 0",
  fontWeight: "bold",
  fontSize: "20px",
};

const borderStyle = {
  border: "2px solid #ffa978ff",
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
  backgroundColor: "#ff5e00ff",
  color: "white",
  width: "100px",
  cursor: "pointer",
};

export default SignUp;
