import React, { useState } from "react";
import styled from "styled-components";
import { Search, Home, BookOpen, FileText } from "lucide-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fdfdf8;
  height: 100vh;
  padding: 1rem;
`;

const Container = styled.div`
  width: 393px;
  height: 852px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  background: #eee;
  padding: 8px;
  border-radius: 8px;
  margin-bottom: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  border: none;
  background: none;
  outline: none;
  padding: 8px;
`;

const BookCard = styled.div`
  background: #f8f6ef;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
`;

const BookImage = styled.div`
  width: 50px;
  height: 70px;
  background: #ddd;
  margin-right: 16px;
`;

const EditButton = styled.button`
  width: 100%;
  padding: 12px;
  background: green;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
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
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
`;

const BookRecordPage = () => {
  const [searchText, setSearchText] = useState("");
  const [bookTitle] = useState("선형대수");
  const [bookRecord, setBookRecord] = useState("떡볶이 레시피");

  function searchBook() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let titleElement = document.getElementById("bookTitle");

    if (!titleElement) {
      alert("책 제목을 찾을 수 없습니다.");
      return;
    }

    let title = titleElement.textContent.toLowerCase();
    if (!title.includes(input)) {
      alert("책을 찾을 수 없습니다.");
    }
  }


  const editRecord = () => {
    const newText = prompt("새로운 기록을 입력하세요:", bookRecord);
    if (newText !== null) {
      setBookRecord(newText);
    }
  };

  return (
    <Wrapper>
      <Container>
        {/* 검색 바 */}
        <SearchBar>
          <SearchInput
            type="text"
            placeholder="검색"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button onClick={searchBook}>
            <Search />
          </button>
        </SearchBar>

        {/* 책 정보 카드 */}
        <BookCard>
          <BookImage />
          <div>
            <p><strong>책 제목:</strong> {bookTitle}</p>
            <p><strong>날짜:</strong> 2025.01.12</p>
            <p><strong>독서 상태:</strong> 읽음</p>
          </div>
        </BookCard>

        {/* 책 기록 */}
        <div>
          <h3>책 기록 페이지</h3>
          <p>{bookRecord}</p>
        </div>

        {/* 수정하기 버튼 */}
        <EditButton onClick={editRecord}>수정하기</EditButton>
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
    </Wrapper>


  );
};

export default BookRecordPage;
