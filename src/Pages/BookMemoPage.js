import React, { useEffect, useState } from "react";
import axios from 'axios';
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BookMemoPage = () => {
  const [memos, setMemos] = useState([]);
  const navigate = useNavigate();

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTY4MzU1NiwiZXhwIjoxNzQxNjg3MTU2fQ.fyao79oCR6qkIlz_Zsincgbtcp_Gr1EuTYoZ5xkExNE';

  useEffect(() => {
    axios.get(`http://${process.env.REACT_APP_API_URL}:3000/finishlist`, {
      headers: {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const readBookList = res.data.data || [];
      setMemos(readBookList);
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
        {memos && memos.length > 0 ? (
          memos.map((memo) => (
            <MemoItem key={memo.id}>
              <BookCover />
              <MemoContent>
                <MemoText>{memo.title}</MemoText>
                <MemoInfo>
                <EditButton onClick={() => navigate("/book-record", {
                  state: {
                    bookId: memo.id,
                    title: memo.title,
                    updatedAt: memo.updatedAt
                  }
                })}>
                  <FiEdit2 size={14} />
                </EditButton>
                </MemoInfo>
                <MemoDate>{memo.updatedAt}</MemoDate>
              </MemoContent>
            </MemoItem>
          ))
        ) : (
          <EmptyMessage>현재 작성한 메모가 없습니다.</EmptyMessage>
        )}
      </MemoList>

      {/* 하단바 */}
      <BottomNav>
        <NavButton onClick={() => navigate("/")}>
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

const Container = styled.div`
  width: 393px;
  height: 758px;
  margin: 0 auto;
  background-color: #FDFDF8;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SearchBar = styled.div`
  width: 100%;
  height: 56px;
  background-color: #f0edde;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 50px;
  height: 30px;
`;

const SearchPlaceholder = styled.div`
  flex: 1;
  height: 40px;
  background-color: #fffdfa;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding: 0 10px;
  cursor: pointer;

  span {
    color: #888;
    flex: 1;
  }

  .icon {
    width: 25px;
    height: 25px;
  }
`;

const MemoList = styled.div`
  width: 100%;
  max-width: 430px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-bottom: 80px;
`;

const MemoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const BookCover = styled.div`
  width: 85px;
  height: 85px;
  background: #eee;
  border-radius: 10px;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const MemoContent = styled.div`
  flex: 1;
  background: #fffcf5;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

const MemoText = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

const MemoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

const MemoDate = styled.small`
  display: block;
  margin-top: 5px;
  color: #777;
`;

const EmptyMessage = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 50px;
`;

const BottomNav = styled.nav`
  width: 393px;
  height: 60px;
  background-color: #f0edde;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 10px 10px 0 0;
`;

const NavButton = styled.button`
  flex: 1;
  height: 60px;
  background: none;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }

  span {
    font-size: 12px;
    margin-top: 2px;
    color: #333;
  }
`;
