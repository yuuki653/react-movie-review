import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <Link to={`/movie/${id}`} style={linkStyle}>
      <div style={cardStyle}>
        <img src={imageUrl} alt={title} style={cardImg} />
        <h3>{title}</h3>
        <p>⭐{vote_average}</p>
        <p>公開日：{release_date}</p>
      </div>
    </Link>
  );
};

const linkStyle = {
  textDecoration: "none",
  color: "inherit",
};

const cardStyle = {
  width: "250px",
  margin: "10px",
  padding: "10px",
  background: "#e7e7e7ff",
  borderRadius: "10px",
};

const cardImg = {
  width: "100%",
  height: "350px",
  objectFit: "cover",
};

export default MovieCard;
