import React, { useEffect, useState } from 'react';
import Header from '../../components/Header'; // Header 컴포넌트 import
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import {
  BottomNav,
  NavButton,
} from '../BookShelfStyled';
import {
  BookCover,
  AboutCard,
  MemoText,
} from '../BookMemoStyled';
import axios from 'axios';

const MainPage = () => {
  const navigate = useNavigate();
  const [readingBook, setReadingBook] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_URL}:3000/registerlist`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => {
      const data = res.data.data[0];
      setReadingBook(data);
      console.log("메인 화면에 등록된 책 정보", data);
    })
    .catch((err) => {
      console.error("메인 화면에서 등록된 책 정보를 가져오는 과정에서 오류 발생", err);
    })
  }, []);

  return (
    <div>
      <div className="main-container">
        <Header /> {/* Header 컴포넌트를 추가 */}

        {/* 등록된 책 정보 표시 */}
        <section className="reading-books">
        <h3 style={{ margin: 0, marginBottom: '10px' }}>읽고 있는 책</h3>
        {readingBook ? (
          <div key={readingBook.id} className="book-item">
            <BookCover src={readingBook.thumbnail} alt={readingBook.title} />
            <AboutCard>
              <MemoText>제목 | {readingBook.title}</MemoText>
              <MemoText>저자 | {readingBook.authors.join(', ')}</MemoText>
              <MemoText>출판사 | {readingBook.publisher}</MemoText>
            </AboutCard>
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

      {/* 로고 */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px' }}>
          <img
            src="/logo.png"
            alt="App Logo"
            style={{ width: '250px', height: '180px', opacity: 0.3 }}
            className="logo"
          />
        </div>

        {/* 하단 네비게이션 */}
        <BottomNav>
            <NavButton active={true} onClick={() => navigate("/main")}>
                <img src="/images/HomeIcon.svg" alt="홈"/>
                <span>홈</span>
            </NavButton>
            <NavButton onClick={() => navigate("/reading")}>
                <img src="/images/BookcaseIcon.svg" alt="책장"/>
                <span>책장</span>
            </NavButton>
            <NavButton onClick={() => navigate("/bookmemo")}>
                <img src="/images/NoteIcon.svg" alt="노트"/>
                <span>노트</span>
            </NavButton>
        </BottomNav>
      </div>
    </div>
  );
};

export default MainPage;