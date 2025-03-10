import React from "react";
import styled from "styled-components";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BookMemoPage = () => {
  const navigate = useNavigate();

  const memos = [
    { id: 1, bookCover: "", text: "죽고싶지만 떡볶이는 먹고싶어", date: "2024. 11. 24" },
    { id: 2, bookCover: "", text: "곰돌이 푸, 행복한 일은 매일 있어", date: "2024. 12. 11" },
    { id: 3, bookCover: "", text: "선형대수", date: "2025. 1. 30" },
    { id: 2, bookCover: "", text: "자료구조", date: "2024. 11. 24"},
    { id: 2, bookCover: "", text: "C++", date: "2024. 11. 24"},
  ];

  return (
    <Container>
      <SearchBar>
        <Logo src="/logo.png" alt="로고" />
        <SearchPlaceholder>
          <span>검색</span>
          <img className="icon" src="/searchicon.png" alt="검색 아이콘" />
        </SearchPlaceholder>
      </SearchBar>
      <MemoList>
        {memos.map((memo) => (
          <MemoItem key={memo.id}>
            <BookCover />
            <MemoContent>
              <MemoText>{memo.text}</MemoText>
              <MemoInfo>
                <EditButton onClick={() => navigate("/book-record")}>
                  <FiEdit2 size={14} />
                </EditButton>
                <span>1개</span>
              </MemoInfo>
              <MemoDate>{memo.date}</MemoDate>
            </MemoContent>
          </MemoItem>
        ))}
      </MemoList>
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

export default BookMemoPage;

const Container = styled.div`
  width: 100%;
  height: 80vh;
  background-color: #fdfdf8;
  display: flex;
  flex-direction: column;
  align-items: center;
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

const BottomNav = styled.nav`
  width: 100%;
  max-width: 350px;
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
