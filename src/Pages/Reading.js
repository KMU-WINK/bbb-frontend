import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    ReadingWrapper,
    SearchBar,
    Logo,
    SearchPlaceholder,
    ReadingStatusBar,
    StatusButton,
    StatusIconWrapper,
    StatusText,
    ArrowIcon,
    BookList,
    BookItem,
    BottomNav,
    NavButton,
} from "./BookShelfStyled";

const Reading = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const newBook = location.state?.newBook || null; // 전달받은 책 정보
    const [readingBooks, setReadingBooks] = useState([]);

    // 📌 DB에서 읽는 중 목록 불러오기
    useEffect(() => {
        axios.get('/reading-books') // DB에서 읽는 중 책 목록 불러오기
            .then(response => {
                setReadingBooks(response.data);
            })
            .catch(error => {
                console.error("Error fetching reading books:", error);
            });
    }, []);

    return (
        <ReadingWrapper>
            {/* 검색창 */}
            <SearchBar>
                <Logo src="/images/Logo.svg" alt="로고" />
                <SearchPlaceholder onClick={() => navigate('/search')}>
                    <span></span>
                    <img src="/images/SearchIcon.svg" alt="검색" className="icon" />
                </SearchPlaceholder>
            </SearchBar>

            {/* 독서 상태 창 */}
            <ReadingStatusBar>
                <StatusButton active={true} onClick={() => navigate('/reading')}>
                    <StatusIconWrapper style={{ backgroundColor: '#F7EE46' }}>
                        <img src="/images/ReadingBook.svg" alt="읽는 중" />
                    </StatusIconWrapper>
                    <StatusText>읽는 중</StatusText>
                    <ArrowIcon src="/images/Arrow.svg" alt=">" />
                </StatusButton>
                <StatusButton onClick={() => navigate('/to-read')}>
                    <StatusIconWrapper style={{ backgroundColor: '#F4B6FF' }}>
                        <img src="/images/ToReadBook.svg" alt="읽을 책" />
                    </StatusIconWrapper>
                    <StatusText>읽을 책</StatusText>
                    <ArrowIcon src="/images/Arrow.svg" alt=">" />
                </StatusButton>
                <StatusButton onClick={() => navigate('/read')}>
                    <StatusIconWrapper style={{ backgroundColor: '#86CD68' }}>
                        <img src="/images/ReadBook.svg" alt="읽은 책" />
                    </StatusIconWrapper>
                    <StatusText>읽은 책</StatusText>
                    <ArrowIcon src="/images/Arrow.svg" alt=">" />
                </StatusButton>
            </ReadingStatusBar>

            {/* 책 목록 */}
            <BookList>
                {readingBooks.map((book, index) => (
                    <BookItem key={index} onClick={() => navigate('/note')}>
                        <img src={book.thumbnaile} alt={book.title} />
                        <p>{book.title}</p>
                    </BookItem>
                ))}
            </BookList>

            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavButton onClick={() => navigate('/')}>
                    <img src="/images/HomeIcon.svg" alt="홈" />
                    <span>홈</span>
                </NavButton>
                <NavButton active={true} onClick={() => navigate('/to-read')}>
                    <img src="/images/BookcaseIcon.svg" alt="책장" />
                    <span>책장</span>
                </NavButton>
                <NavButton onClick={() => navigate('/note')}>
                    <img src="/images/NoteIcon.svg" alt="노트" />
                    <span>노트</span>
                </NavButton>
            </BottomNav>
        </ReadingWrapper>
    );
};

export default Reading;
