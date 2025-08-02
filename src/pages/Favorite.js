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
      <div style={mainContainerStyle}>
        <button
          style={backButtonStyle}
          onClick={() => {
            navigate(-1);
          }}
        >
          戻る
        </button>
        <p style={favoriteTextStyle}>お気に入り一覧</p>
        <hr style={borderStyle} />
        <div style={movieContainerStyle}>
          {favorites.length > 0 ? (
            favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>お気に入りの映画はありません</p>
          )}
        </div>
      </div>
    </>
  );
};

const mainContainerStyle = {
  width: "90%",
  margin: "40px auto",
};

const favoriteTextStyle = {
  margin: "10px 0 0 0",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "20px",
};

const borderStyle = {
  border: "2px solid #ffd000ff",
  width: "200px",
  margin: "3px auto 20px auto",
};

const movieContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  listStyleType: "none",
  padding: "0",
  justifyContent: "center",
  gap: "10px",
};

const backButtonStyle = {
  border: "none",
  padding: "0",
  margin: "0",
  background: "none",
  color: "#5d9138ff",
  textDecorationLine: "underline",
  textDecorationThickness: "2px",
  textUnderlineOffset: "5px",
  textAlign: "center",
  fontSize: "15px",
  cursor: "pointer",
};

export default Favorite;
