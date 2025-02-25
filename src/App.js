import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/LoadingPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import MainPage from "./Pages/MainPage";
import BookshelfPage from "./Pages/BookshelfPage";
import NotesPage from "./Pages/NotesPage";
import BookDetail from "./Pages/BookDetail";
import "./App.css";
import ToRead from "./Pages/ToRead";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/bookshelf" elemnent={<BookshelfPage />} />
        <Route path="/notes" elementt={<NotesPage />} />
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/to-read" element={<ToRead />} />
      </Routes>
    </Router>
  );
}

export default App;
