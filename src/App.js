import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import MovieDetail from "./pages/MovieDetail.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";
import Favorite from "./pages/Favorite.js";
import { AuthProvider } from "./context/AuthContext.js";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/movie/:id" element={<MovieDetail />}></Route>
          <Route path="/movie/login" element={<Login />}></Route>
          <Route path="/movie/signup" element={<SignUp />}></Route>
          <Route path="/movie/favorite" element={<Favorite />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
