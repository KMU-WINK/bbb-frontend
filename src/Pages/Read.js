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
  BookShelfImage,
  BookShelfTitle, SearchInput, SearchIcon
} from './BookShelfStyled';

const Read = () => {
  const [readBooks, setReadBooks] = useState([]);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`);
    }
  };

  // 주어진 토큰
  const token = "";

  // 📌 DB 읽은 책 목록 불러오기
  useEffect(() => {
    console.log("📌 useEffect 실행됨!");

    axios.get('http://10.30.113.126:3000/finishlist', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        console.log("📌 API 응답 데이터:", JSON.stringify(response.data, null, 2));

        // 응답 데이터에서 books 배열을 추출
        const books = response.data.data || [];  // 📌 "data" 키 안에 있는 배열 가져오기
        setReadBooks(books);

        console.log("📌 최종 책 목록:", books);
      })
      .catch(error => {
        console.error("❌ API 요청 실패:", error);
      });
  }, []);

  return (
    <ReadWrapper>
      {/* 검색창 */}
      <SearchBar>
        <Logo src="/images/Logo.svg" alt="로고" />
        <SearchPlaceholder onClick={() => navigate('/search')}>
          <SearchInput
            type="text"
            placeholder="도서명, 저자, 출판사, ISBN을 검색해 보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <SearchIcon
            src="/images/SearchIcon.svg"
            alt="검색"
            onClick={() => {
              if (searchTerm.trim()) {
                navigate(`/searchresults?query=${searchTerm}`);
              }
            }}
          />
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
        {readBooks.length > 0 &&
          readBooks.map((book, index) => (
            <BookItem key={index} onClick={() => navigate('/book-record-edit',{
              state: {
                bookId: book.id,
                bookTitle: book.title,
                thumbnail: book.thumbnail,
              }})}>
              <BookShelfImage src={book.thumbnail} alt={book.title} />
              <BookShelfTitle>{book.title}</BookShelfTitle>
            </BookItem>
          ))
        }
      </BookList>

      {/* 하단 네비게이션 */}
      <BottomNav>
        <NavButton onClick={() => navigate("/main")}>
          <img src="/images/HomeIcon.svg" alt="홈" />
          <span>홈</span>
        </NavButton>
        <NavButton active={true} onClick={() => navigate("/read")}>
          <img src="/images/BookcaseIcon.svg" alt="책장" />
          <span>책장</span>
        </NavButton>
        <NavButton onClick={() => navigate("/bookmemo")}>
          <img src="/images/NoteIcon.svg" alt="노트" />
          <span>노트</span>
        </NavButton>
      </BottomNav>
    </ReadWrapper>
  );
};

export default Read;