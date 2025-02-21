import React from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header-container">
        
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
