import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import LoadingPage from "./Pages/loadingPage/LoadingPage";
import SigninPage from "./Pages/signinPage/SigninPage";
import SignupPage from "./Pages/signupPage/SignupPage";
import MainPage from "./Pages/mainPage/MainPage";
import SearchResults from "./Pages/searchResultsPage/SearchResultsPage";
import SearchPage from "./Pages/searchPage/SearchPage";
import "./App.css";
import BookDetail from "./Pages/bookdetailPage/BookDetail";
import ToRead from "./Pages/bookshelfPage/ToRead";
import Reading from "./Pages/bookshelfPage/Reading";
import Read from "./Pages/bookshelfPage/Read";
import BookMemoPage from "./Pages/notesPage/BookMemoPage";
import BookRecordPage from "./Pages/notesPage/BookRecordPage";
import RecordRegisterPage from "./Pages/notesPage/RecordRegisterPage";
import RecordEditPage from "./Pages/notesPage/RecordEditPage";

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
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/bookdetail" element={<BookDetail />} />
        <Route path="/to-read" element={<ToRead />} />
        <Route path="/reading" element={<Reading />} />
        <Route path="/read" element={<Read />} />
        <Route path="/bookmemo" element={<BookMemoPage />} />
        <Route path="/book-record" element={<BookRecordPage />} />
        <Route path="/book-record-register" element={<RecordRegisterPage />} />
        <Route path="/book-record-edit" element={<RecordEditPage />} />
      </Routes>
    </Router>
  );
}

export default App;