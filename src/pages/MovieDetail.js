import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import Header from "../components/Header";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [review, setReview] = useState("");
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ja-JP`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("映画詳細の取得に失敗しました：", error);
      }
    };
    fetchMovie();
  }, [id, API_KEY]);

  if (!movie) {
    return <p>読み込み中…</p>;
  }

  const handleAddReview = () => {
    if (!review.trim()) return;
    const newReview = {
      key: Date.now(),
      id: Date.now(),
      text: review,
    };
    setReviews([newReview, ...reviews]);
    setReview("");
  };

  return (
    <>
      <Header showSearch={false} />
      <div style={movieDetailStyle}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          style={imgStyle}
        />
        <div>
          <h2>{movie.title}</h2>
          <p>評価：{movie.vote_average}</p>
          <p>公開日：{movie.release_date}</p>
          <p>{movie.overview || "あらすじがありません"}</p>
          {user ? <button>お気に入りに追加</button> : ""}
        </div>
      </div>
      {user ? (
        <ReviewForm
          review={review}
          setReview={setReview}
          onAddReview={handleAddReview}
        />
      ) : (
        <p>ログインするとレビュー投稿ができます</p>
      )}
      <ReviewList reviews={reviews} />

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

const movieDetailStyle = {
  display: "flex",
  margin: "20px",
  padding: "20px",
  background: "#e7e7e7ff",
  borderRadius: "10px",
};

const imgStyle = {
  width: "250px",
  marginRight: "20px",
};

export default MovieDetail;
