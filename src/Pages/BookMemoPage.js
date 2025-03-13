import React, { useEffect, useState } from "react";
import axios from 'axios';
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import {
  Container,
  SearchBar,
  Logo,
  SearchPlaceholder,
  MemoList,
  MemoItem,
  BookCover,
  MemoContent,
  MemoText,
  MemoInfo,
  MemoEditButton,
  EmptyMessage,
  BottomNav,
  NavButton
} from './BookMemoStyled';

const BookMemoPage = () => {
  const [readBooks, setReadBooks] = useState([]);
  const navigate = useNavigate();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTc1NzgyOSwiZXhwIjoxNzQxNzYxNDI5fQ.JyToxRQ6F6m1-0_nfZt4cNBMw3B1f8ZiUojLVtFy_AA';

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_URL}:3000/finishlist`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const readBookList = res.data.data || [];
      setReadBooks(readBookList);
    })
    .catch((err) => {
      console.error("/finishlist API 호출 중 에러 발생", err);
    })
  }, []);

  return (
    <Container>
      {/* 검색바 */}
      <SearchBar>
        <Logo src="/logo.png" alt="로고" />
        <SearchPlaceholder>
          <span>검색</span>
          <img className="icon" src="/searchicon.png" alt="검색 아이콘" />
        </SearchPlaceholder>
      </SearchBar>

      {/* 메모한 책 리스트 */}
      <MemoList>
        {readBooks && readBooks.length > 0 ? (
          readBooks.map((book) => (
            <MemoItem key={book.id}>
              <BookCover src={book.thumbnail} alt={`${book.title}`} />
              <MemoContent>
                <MemoText>{book.title}</MemoText>
                <MemoInfo>
                <MemoEditButton onClick={() => navigate("/book-record", {
                  state: {
                    bookId: book.id,
                    title: book.title,
                    thumbnail: book.thumbnail,
                  }
                })}>
                  <FiEdit2 size={14} />
                </MemoEditButton>
                </MemoInfo>
              </MemoContent>
            </MemoItem>
          ))
        ) : (
          <EmptyMessage>현재 작성한 메모가 없습니다.</EmptyMessage>
        )}
      </MemoList>

      {/* 하단바 */}
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

export default BookMemoPage;
