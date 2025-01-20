import React from "react";
import Header from "../components/Header"; // Header 컴포넌트 import
import "./MainPage.css";
import { useNavigate } from 'react-router-dom';

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
                        <button className="search-button"
                        onClick={() => navigate('/search')}>
                            <span className="search-icon">🔍</span>
                            <span className="search-text">검색</span>
                        </button>
                    </div>
                </section>

                <section className="recommendations">
                    <h2>추천 도서, 이건 어때요?</h2>
                    <div className="category-buttons">
                        <button className="category-button active">장르소설</button>
                        <button className="category-button">심리학</button>
                        <button className="category-button">여행</button>
                    </div>
                    <div className="book-cards">
                        <div className="book-card"></div>
                        <div className="book-card"></div>
                        <div className="book-card"></div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MainPage;
