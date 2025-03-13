import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/LoadingPage";
import SigninPage from "./Pages/SigninPage";
import SignupPage from "./Pages/SignupPage";
import MainPage from "./Pages/MainPage";
import BookMemoPage from "./Pages/BookMemoPage";
import BookRecordPage from "./Pages/BookRecordPage";
import RecordEditPage from "./Pages/RecordEditPage";
import SearchPage from "./Pages/SearchPage";
import SearchResultsPage from "./Pages/SearchResultsPage";
import "./App.css";
import RecordRegisterPage from "./Pages/RecordRegisterPage";
import BookDetail from "./Pages/BookDetail";
import Reading from "./Pages/Reading";
import ToRead from "./Pages/ToRead";
import Read from "./Pages/Read";

    
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loading" element={<LoadingPage />} />
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/header" element={<Header />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/searchresults" element={<SearchResultsPage />} />
        <Route path="/bookmemo" element={<BookMemoPage />} />
        <Route path="/book-record" element={<BookRecordPage />} />
        <Route path="/book-record-register" element={<RecordRegisterPage />} />
        <Route path="/book-record-edit" element={<RecordEditPage />} />
        <Route path="bookdetail" element={<BookDetail />} />
        <Route path="reading" element={<Reading />} />
        <Route path="to-read" element={<ToRead />} />
        <Route path="read" element={<Read />} />
      </Routes>
    </Router>
  );
}

export default App;

