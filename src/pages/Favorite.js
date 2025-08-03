import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";
import Header from "../components/Header";
import MovieCard from "../components/MovieCard.js";

const Favorite = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);

  // ログインしていない状態の動作
  useEffect(() => {
    if (!user) {
      navigate("/movie/login");
    }
  }, [user, navigate]);

  // お気に入り表示
  useEffect(() => {
    const fetchFavorite = async () => {
      if (!user) return;

      const favRef = collection(db, "favorite", user.uid, "movies");
      const snapshot = await getDocs(favRef);
      const favs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFavorites(favs);
    };
    fetchFavorite();
  }, [user]);

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
        <p className="mt-2 text-center font-bold text-xl">お気に入り一覧</p>
        <hr className="border-2 border-orange-400 w-48 mx-auto mt-1 mb-5" />
        <div className="flex flex-wrap justify-center">
          {favorites.length > 0 ? (
            favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p className="text-center text-gray-600 text-lg mt-8">
              お気に入りの映画はありません
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Favorite;
