import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import {
  doc,
  setDoc,
  deleteDoc,
  getDoc,
  getDocs,
  collection,
  addDoc,
  serverTimestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase.js";
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
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // レビュー取得
  const fetchReviews = async () => {
    if (!movie) return;
    const reviewRef = collection(
      db,
      "reviews",
      movie.id.toString(),
      "comments"
    );
    const q = query(reviewRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const revs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReviews(revs);
  };

  // 映画情報取得
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

  // お気に入り管理
  useEffect(() => {
    const checkFavorite = async () => {
      if (user && movie) {
        const docRef = doc(
          db,
          "favorite",
          user.uid,
          "movies",
          movie.id.toString()
        );
        const docSnap = await getDoc(docRef);
        setIsFavorite(docSnap.exists());
      }
    };
    checkFavorite();
  }, [user, movie]);

  // お気に入りボタン
  const toggleFavorite = async () => {
    if (!user) {
      alert("ログインが必要です");
      return;
    }

    const docRef = doc(db, "favorite", user.uid, "movies", movie.id.toString());

    try {
      if (isFavorite) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, {
          title: movie.title,
          poster_path: movie.poster_path,
          release_date: movie.release_date,
          vote_average: movie.vote_average,
        });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("お気に入りの切り替えに失敗：", error);
    }
  };

  // 最初にレビュー取得
  useEffect(() => {
    if (movie) {
      fetchReviews();
    }
  }, [movie]);

  // レビュー投稿
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!user) return alert("ログインしてください");

    const reviewRef = collection(
      db,
      "reviews",
      movie.id.toString(),
      "comments"
    );
    await addDoc(reviewRef, {
      text: review,
      userId: user.uid,
      userName: user.displayName || "匿名",
      createdAt: serverTimestamp(),
    });

    setReview("");
    fetchReviews();
  };

  if (!movie) {
    return (
      <p className="text-center text-gray-600 text-lg mt-8">読み込み中…</p>
    );
  }

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

        <p className="mt-2 text-center font-bold text-xl">映画詳細</p>
        <hr className="border-2 border-purple-400 w-48 mx-auto mt-1 mb-5" />
        <div className="mt-8 mb-12  bg-gray-200 p-5 rounded-lg">
          <div className="flex flex-col md:flex-row items-center lg:items-start">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-48 md:w-64 mb-4 lg:mb-0 lg:mr-5 rounded shadow-md"
            />
            <div className="text-left flex-1 px-8">
              <p className="text-2xl font-bold mb-3">{movie.title}</p>
              <p className="mb-2 text-lg">評価：{movie.vote_average}</p>
              <p className="mb-3 text-lg">公開日：{movie.release_date}</p>
              {user ? (
                <button
                  onClick={toggleFavorite}
                  className={`px-4 py-2 mb-3 rounded font-medium transition-colors ${
                    isFavorite
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  {isFavorite ? "お気に入り解除" : "お気に入り追加"}
                </button>
              ) : null}
            </div>
          </div>
          <div className="mt-4">
            <p className="text-gray-700 leading-relaxed">
              {movie.overview || "あらすじがありません"}
            </p>
          </div>
        </div>

        {user ? (
          <ReviewForm
            review={review}
            setReview={setReview}
            onAddReview={handlesubmit}
          />
        ) : (
          <p className="mb-10 text-gray-600">
            ログインするとレビュー投稿ができます
          </p>
        )}

        <ReviewList reviews={reviews} />
      </div>
    </>
  );
};

export default MovieDetail;
