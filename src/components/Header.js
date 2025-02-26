import React, { useState } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [searchTerm, setSearchTerm] = useState(''); // searchTerm 상태 정의
  const navigate = useNavigate();

  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === 'Enter' && searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`); // 백틱으로 수정
    }
  };

  return (
    <header className="header-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="책 검색하기"
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // 입력값 상태 관리
          onKeyDown={handleKeyDown}
        />
        <img
          src="/searchicon.png"
          alt="search Icon"
          style={{ width: '20px', height: '20px' }}
          className="search-icon"
          onClick={() => navigate(`/searchresults?query=${searchTerm}`)} // 백틱으로 수정
        />
      </div>
    </header>
  );
};

export default Header;
