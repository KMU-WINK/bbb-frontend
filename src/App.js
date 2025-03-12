import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/LoadingPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import MainPage from "./Pages/MainPage";
import BookshelfPage from "./Pages/BookshelfPage";
import BookMemoPage from "./Pages/BookMemoPage";
import BookRecordPage from "./Pages/BookRecordPage";
import RecordEditPage from "./Pages/RecordEditPage";
import SearchPage from "./Pages/SearchPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import "./App.css";
import RecordRegisterPage from "./Pages/RecordRegisterPage";
    
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoadingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchresults" element={<SearchResultsPage />} />
        <Route path="/bookshelf" elemnent={<BookshelfPage />} />
        <Route path="/bookmemo" element={<BookMemoPage />} />
        <Route path="/book-record" element={<BookRecordPage />} />
        <Route path="/book-record-register" element={<RecordRegisterPage />} />
        <Route path="/book-record-edit" element={<RecordEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;

