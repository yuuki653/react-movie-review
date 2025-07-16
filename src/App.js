import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import MovieDetail from "./pages/MovieDetail.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/movie/:id" element={<MovieDetail />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
