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
      <div>
        <h2>お気に入り一覧</h2>
        <div style={mainStyles}>
          {favorites.length > 0 ? (
            favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>お気に入りの映画はありません</p>
          )}
        </div>
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
};

export default Favorite;
