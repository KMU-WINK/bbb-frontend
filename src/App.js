import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/loadingPage/LoadingPage";
import SigninPage from "./Pages/signinPage/SigninPage";
import SignupPage from "./Pages/signupPage/SignupPage";
import MainPage from "./Pages/mainPage/MainPage";
import BookshelfPage from "./Pages/bookshelfPage/BookshelfPage";
import NotesPage from "./Pages/notesPage/NotesPage";
import SearchPage from "./Pages/searchPage/SearchPage";
import SearchResults from "./Pages/searchResultsPage/SearchResultsPage";
import "./App.css";

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
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchresults" element={<SearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;
