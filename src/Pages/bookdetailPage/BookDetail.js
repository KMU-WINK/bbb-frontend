import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './BookDetail.css';

const BookDetail = () => {
    const navigate = useNavigate();

    const [book, setBook] = useState({
        id: 1,
        title: "책 제목 예시",
        author: "저자 정보 예시",
        description: "책 소개 예시",
        image: "/images/book-cover-placeholder.png",
    });

    const handleSearchClick = () => {
        navigate('/search');
    };

    const handleWishClick = () => {
        navigate('/to-read', { state: { book } });
    };

    const handleRegisterClick = () => {
        navigate('/reading', { state: { book } });
    };

    return (
        <div className="book-detail-wrapper">
            {/* 검색창 */}
            <div className="search-bar">
                <img src="/images/Logo.svg" alt="로고" className="logo" />
                <div onClick={handleSearchClick} className="search-placeholder">
                    <span></span>
                    <img src="/images/SearchIcon.svg" alt="검색" className="icon" />
                </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div className="book-detail-container">
                {/* 책 정보 박스 */}
                <div className="book-info-box">
                    <img src={book.image} alt={book.title} className="book-image" />
                    <h2 className="book-title">{book.title}</h2>
                    <p className="book-author"><strong>저자 정보</strong> {book.author}</p>
                    <p className="book-description"><strong>소개</strong> {book.description}</p>
                </div>

                {/* 버튼 */}
                <div className="button-group">
                    <button className="wishlist-btn" onClick={handleWishClick}>
                        <div className="icon-wrapper">
                            <img src="/images/HeartIcon.svg" alt="찜하기" />
                        </div>
                        <span className="button-text">책 찜하기</span>
                    </button>

                    <button className="register-btn" onClick={handleRegisterClick}>
                        <div className="icon-wrapper">
                            <img src="/images/RegisterIcon.svg" alt="등록하기" />
                        </div>
                        <span className="button-text">책 등록하기</span>
                    </button>
                </div>
            </div>

            {/* 하단 네비게이션 */}
            <nav className="bottom-nav">
                <button onClick={() => navigate("/")} className="nav-button active">
                    <img src="/images/HomeIcon.svg" alt="홈" />
                    <span>홈</span>
                </button>
                <button onClick={() => navigate("/to-read")} className="nav-button">
                    <img src="/images/BookcaseIcon.svg" alt="책장" />
                    <span>책장</span>
                </button>
                <button onClick={() => navigate("/note")} className="nav-button">
                    <img src="/images/NoteIcon.svg" alt="노트" />
                    <span>노트</span>
                </button>
            </nav>
        </div>
    );
};

export default BookDetail;