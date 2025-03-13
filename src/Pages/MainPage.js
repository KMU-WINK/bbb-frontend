import React, { useState } from 'react';
import './MainPage.css';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';
import {
  SearchBar,
  Logo,
  SearchIcon,
  SearchInput,
} from './BookShelfStyled';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, title, thumbnail, ReadingDate } = location.state || {};

  const readingBooksExist = Boolean(bookId);

  // 상태 변수 추가
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 처리 함수 추가
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    console.log(event.key);
    if (event.key === 'Enter' && searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`); // 백틱으로 수정
    }
  };


  return (
    <div>
      <SearchBar>
        <Logo src="/images/Logo.svg" alt="로고" />
          <SearchInput
            type="text"
            placeholder="도서명, 저자, 출판사, ISBN을 검색해 보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchIcon
            src="/images/SearchIcon.svg"
            alt="검색"
            onClick={handleSearch}
          />
      </SearchBar>

      <div className="main-container">
        <section className="reading-books">
          <h2>읽고 있는 책</h2>
          {readingBooksExist ? (
            <div>
              <p>{title}</p>
              <img src={thumbnail} alt={title} className="book-thumbnail" />
              <p>{ReadingDate}</p>
              <button className="start-memo">기록하기</button>
            </div>
          ) : (
            <div>
              <p>등록된 읽고 있는 책이 없어요</p>
              <p>읽고 있는 책을 등록해 주세요</p>
              <div className="search-container">
                <button className="search-button" onClick={() => navigate('/search')}>
                  <span className="search-icon">🔍</span>
                  <span className="search-text">검색</span>
                </button>
              </div>
            </div>
          )}
        </section>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '0px',
          }}
        >
          <img
            src="/logo.png"
            alt="App Logo"
            style={{ width: '250px', height: '180px', opacity: 0.3 }}
            className="logo"
          />
        </div>

        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;
