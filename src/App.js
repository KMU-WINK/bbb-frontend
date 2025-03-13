import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/loadingPage/LoadingPage";
import SigninPage from "./Pages/signinPage/SigninPage";
import SignupPage from "./Pages/signupPage/SignupPage";
import MainPage from "./Pages/mainPage/MainPage";
import NotesPage from "./Pages/notesPage/NotesPage";
import SearchResults from "./Pages/searchResultsPage/SearchResultsPage";
import SearchPage from "./Pages/searchPage/SearchPage";
import "./App.css";
import BookDetail from "./Pages/bookdetailPage/BookDetail";
import ToRead from "./Pages/bookshelfPage/ToRead";
import Reading from "./Pages/bookshelfPage/Reading";
import Read from "./Pages/bookshelfPage/Read";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/bookdetail" element={<BookDetail />}/>
        <Route path="/notes" elementt={<NotesPage />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/to-read" element={<ToRead />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/read" element={<Read />} />
      </Routes>
    </Router>
  );
}

export default App;