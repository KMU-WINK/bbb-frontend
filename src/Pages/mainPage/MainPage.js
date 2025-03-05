import React from 'react';
import Header from '../../components/Header'; // Header 컴포넌트 import
import './MainPage.css';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header /> {/* Header 컴포넌트를 추가 */}
      <div className="main-container">
        <section className="reading-books">
          <h2>읽고 있는 책</h2>
          <p>등록된 읽고 있는 책이 없어요</p>
          <p>읽고 있는 책을 등록해 주세요</p>
          <div className="search-container">
            <button className="search-button" onClick={() => navigate('/search')}>
              <span className="search-icon">🔍</span>
              <span className="search-text">검색</span>
            </button>
          </div>
        </section>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '0px' }}>
          <img
            src="/logo.png"
            alt="App Logo"
            style={{ width: '250px', height: '180px', opacity: 0.3 }} // 객체를 중괄호로 감쌈
            className="logo"
          />
        </div>
        <NavBar />
      </div>
    </div>
  );
};

export default MainPage;

