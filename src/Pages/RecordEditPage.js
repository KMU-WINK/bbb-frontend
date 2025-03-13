import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Container,
  SearchBar,
  Logo,
  SearchPlaceholder,
  BookCard,
  BookCover,
  AboutCard,
  MemoText,
  BottomNav,
  NavButton,
  RecordEditButton,
} from './BookMemoStyled';
import axios from 'axios';

const EditRecordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, bookTitle, thumbnail, recordDate, recordTitle, recordContent } = location.state || {}; // 책 제목, 책 표지, 작성일, 메모 제목, 메모 내용

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [searchTerm, setSearchTerm] = useState('');


  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTc1NzgyOSwiZXhwIjoxNzQxNzYxNDI5fQ.JyToxRQ6F6m1-0_nfZt4cNBMw3B1f8ZiUojLVtFy_AA';

  useEffect(() => {
    if (location.state) {
      setTitle(recordTitle);
      setContent(recordContent);
    }
  }, [location.state]);

  const HandleEdit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(content);
    axios.patch(`http://${process.env.REACT_APP_API_URL}:3000/notes`,
      { bookId, title, content }, // body 데이터
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${token}` // 올바른 헤더 형식
        }
      })
    .then((res) => {
      const data = res.data;
      console.log(data);
      if (data.success) {
        navigate("/bookmemo");
      }
    })
    .catch((err) => {
      console.error("Error updating record:", err);
    });
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && searchTerm.trim()) {
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
        <BookCover src={thumbnail} alt={`${bookTitle}`} />
        <AboutCard>
          <MemoText>책 제목: {bookTitle}</MemoText>
          <MemoText>날짜: {recordDate}</MemoText>
        </AboutCard>
      </BookCard>

      {/* 수정하기 */}
      <form className='edit-form' onSubmit={HandleEdit}>
        <div className='form-group'>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <RecordEditButton>수정하기</RecordEditButton>
      </form>

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

export default EditRecordPage;