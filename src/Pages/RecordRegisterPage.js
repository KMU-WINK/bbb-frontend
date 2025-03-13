// 읽는 중인 책에서 메모 등록하기 버튼 클릭 -> RecordRegisterPage.js -> POST /notes 요청 & POST /registerlist 요청
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import React, { useState } from 'react'; 
import { useLocation } from 'react-router-dom';

const RecordRegisterPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { bookId, bookTitle, thumbnail } = location.state || {};

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (location.state) {
      setTitle('');
      setContent('');
    }
  }, [location.state]);

  const HandleRegister = (e) => {
    e.preventDefault();
    axios.post(`http://${process.env.REACT_APP_API_URL}:3000/finishlist`,
      {bookId},
      {
        headers: {
          'Cache-Control': 'no-cache',
          Authorization: `Bearer ${token}`,
        }
      })
    .then((res) => {
      if (res.data.success) {
        axios.post(`http://${process.env.REACT_APP_API_URL}:3000/notes`,
          { bookId, title, content },
          {
            headers: {
              'Cache-Control': 'no-cache',
              Authorization: `Bearer ${token}`,
            }
          })
        .then((res) => {
          const data = res.data;
          if (data.success) {
            navigate('/bookmemo');
          }
        })
        .catch((err) => {
          console.error("POST /notes API 요청 중 에러 발생", err);
        })
      }
    })
    .catch((err) => {
      console.error("POST /finishlist API 요청 중 에러 발생", err);
    })
  } 

  const now = new Date();
  const recordDate = new Date(now.getTime() + 9 * 60 * 60 * 1000).toISOString();

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

      {/* 등록하기 */}
      <form className='edit-form' onSubmit={HandleRegister}>
        <div className='form-group'>
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <RecordEditButton>등록하기</RecordEditButton>
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
  )
}

export default RecordRegisterPage;