import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ja-JP`
        );
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error("映画データの取得に失敗しました：", error);
      }
    };
    fetchMovies();
  }, [API_KEY]);

  return (
    <div>
      <h1>Popular Movies</h1>
      <ul style={mainStyles}>
        {movies.map((movie) => (
          <li key={movie.id}>
            <MovieCard movie={movie} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mainStyles = {
  display: "flex",
  flexWrap: "wrap",
  listStyleType: "none",
};

export default Home;
