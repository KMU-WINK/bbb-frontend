import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Container,
  SearchBar,
  SearchPlaceholder,
  Logo,
  BookCard,
  BookCover,
  RecordEditButton,
  BottomNav,
  NavButton,
  MemoText,
  AboutCard,
  RecordText,
} from './BookMemoStyled';

const BookRecordPage = () => {
  const [records, setRecords] = useState("");
  const location = useLocation();
  const { bookId, title, thumbnail } = location.state || {}; // 책 제목, 책 표지
  const navigate = useNavigate();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTc1NzgyOSwiZXhwIjoxNzQxNzYxNDI5fQ.JyToxRQ6F6m1-0_nfZt4cNBMw3B1f8ZiUojLVtFy_AA';

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_URL}:3000/notes?bookId=${bookId}`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const recordList = res.data.data || [];
      setRecords(recordList);
    })
    .catch((err) => {
      console.error("/notes API 호출 중 에러 발생", err);
    })
  }, [])

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`);
    }
  };

  return (
    <Container>
      {/* 검색 바 */}
      <SearchBar>
        <Logo src="/logo.png" alt="로고" />
        <SearchPlaceholder>
          <input
            type="text"
            placeholder="도서명, 저자, 출판사, ISBN을 검색해 보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <img className="icon" src="/searchicon.png" alt="검색 아이콘" onClick={handleSearch} />
        </SearchPlaceholder>
      </SearchBar>

      {/* 책 정보 카드 */}
      <BookCard>
        <BookCover src={thumbnail} alt={`${title}`} />
        <AboutCard>
          <MemoText>책 제목: {title}</MemoText>
          <MemoText>날짜: {records.updatedAt}</MemoText>
        </AboutCard>
      </BookCard>

      {/* 책 기록 */}
      <RecordText style={{ fontWeight: 'bold' }}>{records.title}</RecordText>
      <RecordText>{records.content}</RecordText>


      {/* 수정하기 버튼 */}
      <RecordEditButton onClick={() => navigate(`/book-record-edit`, {
        state: {
          bookId: bookId,
          bookTitle: title,
          thumbnail: thumbnail,
          recordDate: records.updatedAt,
          recordTitle: records.title,
          recordContent: records.content,
        }
      })}>수정하기</RecordEditButton>

      {/* 하단 네비게이션 바 */}
      <BottomNav>
        <NavButton onClick={() => navigate("/main")}>
          <img src="/images/HomeIcon.svg" alt="홈" />
          <span>홈</span>
        </NavButton>
        <NavButton onClick={() => navigate("/to-read")}>
          <img src="/images/BookcaseIcon.svg" alt="책장" />
          <span>책장</span>
        </NavButton>
        <NavButton active onClick={() => navigate("/bookmemo")}>
          <img src="/images/NoteIcon.svg" alt="노트" />
          <span>노트</span>
        </NavButton>
      </BottomNav>
    </Container>
  );
};

export default BookRecordPage;
