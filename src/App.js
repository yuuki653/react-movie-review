import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import MovieDetail from "./pages/MovieDetail.js";
import Login from "./pages/Login.js";
import SignUp from "./pages/SignUp.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<MovieDetail />}></Route>
        <Route path="/movie/login" element={<Login />}></Route>
        <Route path="/movie/signup" element={<SignUp />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
