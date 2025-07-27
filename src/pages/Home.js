import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [searchedQuery, setSearchedQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ja-JP`
        );
        const data = await res.json();

        if (data.results) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
      } catch (error) {
        console.error("映画データの取得に失敗しました：", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setIsSearching(true);
      setSearchedQuery(query);
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(
          query
        )}&language=ja-JP`
      );
      const data = await res.json();

      setMovies(data.results || []);
    } catch (error) {
      console.error("映画データの取得に失敗しました：", error);
      setMovies([]);
    } finally {
      setIsSearching(false);
      setIsSearched(true);
    }
  };

  const handleBackToHome = async () => {
    setQuery("");
    setIsSearched(false);
    setSearchedQuery("");
    try {
      setLoading(true);
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ja-JP`
      );
      const data = await res.json();

      if (data.results) {
        setMovies(data.results);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("映画データの取得に失敗しました：", error);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Header query={query} setQuery={setQuery} onSearch={handleSearch} />

      {isSearched && (
        <div>
          <button onClick={handleBackToHome}>人気映画一覧に戻る</button>
        </div>
      )}

      {(loading || isSearching) && (
        <div>{loading ? "読み込み中…" : "検索中…"}</div>
      )}

      {(!loading || !isSearching) &&
        (movies.length > 0 ? (
          <ul style={mainStyles}>
            {movies.map((movie) => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        ) : (
          <p>
            {isSearched
              ? `「${searchedQuery}」の検索結果が見つかりませんでした`
              : "映画が見つかりませんでした"}
          </p>
        ))}
    </div>
  );
};

const mainStyles = {
  display: "flex",
  flexWrap: "wrap",
  listStyleType: "none",
  padding: "0 20px",
  justifyContent: "center",
  gap: "10px",
};

export default Home;
