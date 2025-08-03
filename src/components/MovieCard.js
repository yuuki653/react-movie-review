import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  if (!movie) return null;

  const { id, title, poster_path, vote_average, release_date } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/movie/${id}`}>
      <div className="m-3 p-3 w-64 bg-gray-200 hover:bg-gray-300 transition-colors rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-80 object-cover rounded shadow-md"
        />
        <h3 className="text-md font-bold my-2">{title}</h3>
        <p className="mb-2 text-md">⭐{vote_average}</p>
        <p className="mb-2 text-sm">公開日：{release_date}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
