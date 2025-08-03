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
      <Header showSearch={false} />
      <div className="w-[90%] mx-auto my-10">
        <button
          className="text-green-600 underline decoration-2 underline-offset-4 text-sm hover:text-green-700 transition-colors"
          onClick={() => {
            navigate(-1);
          }}
        >
          戻る
        </button>
        <form onSubmit={handlesubmit}>
          <p className="mt-2 text-center font-bold text-xl">新規登録</p>
          <hr className="border-2 border-orange-400 w-48 mx-auto mt-1 mb-5" />
          <div className="flex flex-col items-center mx-auto mt-10 gap-2 w-64">
            <input
              className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-orange-400"
              type="name"
              placeholder="名前（表示名）"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-orange-400"
              type="email"
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-orange-400"
              type="password"
              placeholder="パスワード"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="px-4 py-2 mt-5 rounded font-medium transition-colors bg-orange-500 hover:bg-orange-600 text-white"
              type="submit"
            >
              新規登録
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
