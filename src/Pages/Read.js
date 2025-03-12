import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    ReadWrapper,
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

const Read = () => {
    const [readBooks, setReadBooks] = useState([]);
    const navigate = useNavigate();

    // 주어진 토큰
    const token = "";

    // 읽은 책 목록을 불러오는 useEffect
    useEffect(() => {
        const fetchReadBooks = async () => {
            try {
                // 서버에서 읽은 책 목록을 가져옴
                const response = await axios.get('http://10.30.119.194:3000/registerlist', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                const books = response.data.data || [];  // "data" 키 안에 있는 배열 가져오기
                setReadBooks(books);
            } catch (error) {
                console.error("읽은 책 목록을 가져오는 데 실패했습니다:", error);
            }
        };

        fetchReadBooks();
    }, []);

    return (
        <ReadWrapper>
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
                <StatusButton onClick={() => navigate('/reading')}>
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
                <StatusButton active={true} onClick={() => navigate('/read')}>
                    <StatusIconWrapper style={{ backgroundColor: '#86CD68' }}>
                        <img src="/images/ReadBook.svg" alt="읽은 책" />
                    </StatusIconWrapper>
                    <StatusText>읽은 책</StatusText>
                    <ArrowIcon src="/images/Arrow.svg" alt=">" />
                </StatusButton>
            </ReadingStatusBar>

            {/* 책 목록 */}
            <BookList>
                <BookItem onClick={() => navigate('/note')}>
                    <img src="/images/Book1.jpg" alt="책 1" />
                </BookItem>
                <BookItem onClick={() => navigate('/note')}>
                    <img src="/images/Book2.jpg" alt="책 2" />
                </BookItem>
                <BookItem onClick={() => navigate('/note')}>
                    <img src="/images/Book3.jpg" alt="책 3" />
                </BookItem>
            </BookList>

            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavButton onClick={() => navigate("/")}>
                    <img src="/images/HomeIcon.svg" alt="홈" />
                    <span>홈</span>
                </NavButton>
                <NavButton active={true} onClick={() => navigate("/read")}>
                    <img src="/images/BookcaseIcon.svg" alt="책장" />
                    <span>책장</span>
                </NavButton>
                <NavButton onClick={() => navigate("/note")}>
                    <img src="/images/NoteIcon.svg" alt="노트" />
                    <span>노트</span>
                </NavButton>
            </BottomNav>
        </ReadWrapper>
    );
};

export default Read;
