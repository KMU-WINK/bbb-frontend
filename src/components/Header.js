import React from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header-container">
        <img 
            src="/logo.png" 
            alt="App Logo" 
            style={{ width: '70px', height: '55px' }} // 객체를 중괄호로 감쌈
            className="logo"
            />
        <div className="search-bar">   
            <input
            type="text"
            placeholder="책 검색하기"
            className="search-input"
            />
            <img src="/searchicon.png"
            alt="search Icon"
            style={{ width: '20px', height: '20px'}}
            className="search-icon" 
            onClick={() => navigate('/search')} />
        </div>
        </header>
    );
};

export default Header;
