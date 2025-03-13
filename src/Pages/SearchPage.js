import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ReadWrapper,
  SearchBar,
  SearchPlaceholder,
  Logo,
  SearchInput,
  SearchIcon,
  BottomNav,
  NavButton,
} from "./BookShelfStyled";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/searchresults?query=${searchTerm}`);
    }
  };

  return (
    <ReadWrapper>
      {/* 검색창 */}
      <SearchBar>
        <Logo src="/images/Logo.svg" alt="로고" />
        <SearchPlaceholder>
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

      {/* 하단 네비게이션 */}
      <BottomNav>
        <NavButton active={true} onClick={() => navigate("/")}>
          <img src="/images/HomeIcon.svg" alt="홈" />
          <span>홈</span>
        </NavButton>
        <NavButton onClick={() => navigate("/read")}>
          <img src="/images/BookcaseIcon.svg" alt="책장" />
          <span>책장</span>
        </NavButton>
        <NavButton onClick={() => navigate("/bookmemo")}>
          <img src="/images/NoteIcon.svg" alt="노트" />
          <span>노트</span>
        </NavButton>
      </BottomNav>
    </ReadWrapper>
  )
};

export default SearchPage;
