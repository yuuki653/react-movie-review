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
        <p className="mt-2 text-center font-bold text-xl">ログイン</p>
        <hr className="border-2 border-green-400 w-48 mx-auto mt-1 mb-5" />
        <div className="flex flex-col items-center mx-auto mt-10 gap-2 w-64">
          <input
            className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-green-400"
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="px-4 py-2 rounded font-medium border border-gray-500 focus:outline-none focus:border-green-400"
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="px-4 py-2 mt-5 rounded font-medium transition-colors bg-green-500 hover:bg-green-600 text-white"
            onClick={handleLogin}
          >
            ログイン
          </button>
        </div>
        <p className="mt-14 text-center">
          登録していない方は
          <span>
            <Link
              to="/movie/signup"
              className="px-4 py-2 mt-5 ml-1 rounded font-medium transition-colors bg-orange-500 hover:bg-orange-600 text-white"
            >
              新規登録
            </Link>
          </span>
        </p>
      </div>
    </>
  );
};

export default Login;
