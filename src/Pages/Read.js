import React from "react";
import { useNavigate } from 'react-router-dom';
import "./Read.css";

const Read = () => {
    const navigate = useNavigate();

    return (
        <div className="read-wrapper">
            {/* 검색창 */}
            <div className="search-bar">
                <img src="/images/Logo.svg" alt="로고" className="logo" />
                <div className="search-placeholder" onClick={() => navigate('/search')}>
                    <span></span>
                    <img src="/images/SearchIcon.svg" alt="검색" className="icon" />
                </div>
            </div>

            {/* 독서 상태 창 */}
            <div className="reading-status-bar">
                <button className="status-button" onClick={() => navigate('/reading')}>
                    <div className="status-icon-wrapper" style={{ backgroundColor: '#F7EE46' }}>
                        <img src="/images/ReadingBook.svg" alt="읽는 중" />
                    </div>
                    <span className="status-text">읽는 중</span>
                    <img src="/images/Arrow.svg" alt=">" className="arrow-icon" />
                </button>
                <button className="status-button" onClick={() => navigate('/to-read')}>
                    <div className="status-icon-wrapper" style={{ backgroundColor: '#F4B6FF' }}>
                        <img src="/images/ToReadBook.svg" alt="읽을 책" />
                    </div>
                    <span className="status-text">읽을 책</span>
                    <img src="/images/Arrow.svg" alt=">" className="arrow-icon" />
                </button>
                <button className="status-button active" onClick={() => navigate('/read')}>
                    <div className="status-icon-wrapper" style={{ backgroundColor: '#86CD68' }}>
                        <img src="/images/ReadBook.svg" alt="읽은 책" />
                    </div>
                    <span className="status-text">읽은 책</span>
                    <img src="/images/Arrow.svg" alt=">" className="arrow-icon" />
                </button>
            </div>

            {/* 책 목록 */}
            <div className="book-list">
                <div className="book-item" onClick={() => navigate('/note')}>
                    <img src="/images/Book1.jpg" alt="책 1" />
                </div>
                <div className="book-item" onClick={() => navigate('/note')}>
                    <img src="/images/Book2.jpg" alt="책 2" />
                </div>
                <div className="book-item" onClick={() => navigate('/note')}>
                    <img src="/images/Book3.jpg" alt="책 3" />
                </div>
            </div>

            {/* 하단 네비게이션 */}
            <nav className="bottom-nav">
                <button className="nav-button" onClick={() => navigate("/")}>
                    <img src="/images/HomeIcon.svg" alt="홈" />
                    <span>홈</span>
                </button>
                <button className="nav-button active" onClick={() => navigate("/read")}>
                    <img src="/images/BookcaseIcon.svg" alt="책장" />
                    <span>책장</span>
                </button>
                <button className="nav-button" onClick={() => navigate("/note")}>
                    <img src="/images/NoteIcon.svg" alt="노트" />
                    <span>노트</span>
                </button>
            </nav>
        </div>
    );
};

export default Read;
