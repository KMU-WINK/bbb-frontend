import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    ReadWrapper,
    SearchBar,
    SearchPlaceholder,
    Logo,
    SearchInput,
    SearchIcon,
    BottomNav,
    NavButton,
    ResultsHeader,
    ResultsContainer,
    ResultBookItem,
    ResultBookImage,
    ResultBookInfo,
} from "./BookShelfStyled";

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParam = new URLSearchParams(location.search).get("query");

    const [query, setQuery] = useState(queryParam || "");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!queryParam) return;

        const fetchResults = async () => {
            try {
                const response = await axios.get(`http://10.30.113.126:3000/books/search?query=${queryParam}`, {
                    headers: { 'Cache-Control': 'no-cache' }
                });
                setResults(response.data.data.documents);
            } catch (error) {
                console.error("검색 결과 불러오기 실패:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [queryParam]);

    const handleSearchInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSearchKeyDown = (e) => {
        if (e.key === "Enter" && query.trim()) {
            navigate(`/searchresults?query=${query.trim()}`);
        }
    };

    const sortedResults = [...results].sort((a, b) => {
        return a.title.localeCompare(b.title, "ko-KR");
    });

    return (
      <ReadWrapper>
          {/* 검색창 */}
          <SearchBar>
              <Logo src="/images/Logo.svg" alt="로고" />
              <SearchPlaceholder>
                  <SearchInput
                    type="text"
                    value={query}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="검색어를 입력하세요"
                  />
                  <SearchIcon
                    src="/images/SearchIcon.svg"
                    alt="검색"
                    onClick={() => query.trim() && navigate(`/searchresults?query=${query.trim()}`)}
                  />
              </SearchPlaceholder>
          </SearchBar>

          {/* 책 목록 */}
          <ResultsHeader>
              <p>'{queryParam}' 검색 결과</p>
          </ResultsHeader>
          {loading ? (
            <p>검색 결과 불러오는 중...</p>
          ) : (
            <ResultsContainer>
                {Array.isArray(sortedResults) && sortedResults.length > 0 ? (
                  sortedResults.map((book) => (
                    <ResultBookItem
                      key={book.isbn}
                      onClick={() => navigate(`/bookdetail`, {
                          state: {
                              title: book.title,
                              authors: book.authors,
                              publisher: book.publisher,
                              isbn: book.isbn,
                              thumbnail: book.thumbnail,
                              content: book.contents  // ✅ API에서 contents 필드일 가능성 있음
                          }
                      })}
                    > {/* isbn이 고유 식별자로 적절해요 */}
                        <ResultBookImage src={book.thumbnail} alt={book.title} />
                        <ResultBookInfo>
                            <p className="title">{book.title}</p>
                            <p className="authors">
                                {book.authors && book.authors.length > 0
                                  ? book.authors.join(', ')
                                  : '저자 정보 없음'}
                            </p>
                        </ResultBookInfo>
                    </ResultBookItem>
                  ))
                ) : (
                  <p>검색 결과가 없습니다.</p>
                )}
            </ResultsContainer>
          )}
          {/* 하단 네비게이션 */}
          <BottomNav>
              <NavButton active={true} onClick={() => navigate("/main")}>
                  <img src="/images/HomeIcon.svg" alt="홈" />
                  <span>홈</span>
              </NavButton>
              <NavButton onClick={() => navigate("/to-read")}>
                  <img src="/images/BookcaseIcon.svg" alt="책장" />
                  <span>책장</span>
              </NavButton>
              <NavButton onClick={() => navigate("/bookmemo")}>
                  <img src="/images/NoteIcon.svg" alt="노트" />
                  <span>노트</span>
              </NavButton>
          </BottomNav>
      </ReadWrapper>
    )};

export default SearchResultsPage;