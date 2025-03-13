import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-button ${location.pathname === "/main" ? "active" : ""}`} 
        onClick={() => navigate("/main")}
      >
        <img src="/images/HomeIcon.svg" alt="홈" />
        <span>홈</span>
      </button>
      <button 
        className={`nav-button ${location.pathname === "/bookshelf" ? "active" : ""}`} 
        onClick={() => navigate("/reading")}
      >
        <img src="/images/BookcaseIcon.svg" alt="책장" />
        <span>책장</span>
      </button>
      <button 
        className={`nav-button ${location.pathname === "/notes" ? "active" : ""}`} 
        onClick={() => navigate("/bookmemo")}
      >
        <img src="/images/NoteIcon.svg" alt="노트" />
        <span>노트</span>
      </button>
    </nav>
  );
};

export default NavBar;

