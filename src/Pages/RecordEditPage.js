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
} from './BookMemoStyled';
import axios from 'axios';

const EditRecordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, bookTitle, recordDate, thumbnail, recordTitle, recordContent } = location.state || {}; // 책 제목과 작성 일시, 책 표지

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTcxMzE2OSwiZXhwIjoxNzQxNzE2NzY5fQ.bjbADLBiGvKhwsRLQX3A7LIP5tQhaT8qHfEYQqIe6Dk';

  useEffect(() => {
    if (location.state) {
      setTitle(recordTitle);
      setContent(recordContent);
    }
  }, [location.state, bookTitle]);

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

  return (
    <Container>
      {/* 검색 바 */}
      <SearchBar>
        <Logo src="/logo.png" alt="로고" />
        <SearchPlaceholder>
          <span>검색</span>
          <img className="icon" src="/searchicon.png" alt="검색 아이콘" />
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
        <button type="submit">수정하기</button>
      </form>

      {/* 하단 네비게이션 바 */}
      <BottomNav>
        <NavButton onClick={() => navigate("/")}>
          <img src="/images/HomeIcon.svg" alt="홈" />
          <span>홈</span>
        </NavButton>
        <NavButton onClick={() => navigate("/to-read")}>
          <img src="/images/BookcaseIcon.svg" alt="책장" />
          <span>책장</span>
        </NavButton>
        <NavButton active onClick={() => navigate("/note")}>
          <img src="/images/NoteIcon.svg" alt="노트" />
          <span>노트</span>
        </NavButton>
      </BottomNav>
    </Container>
  );
};

export default EditRecordPage;