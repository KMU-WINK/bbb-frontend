import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalStyle from "../../GlobalStyle";
import axios from "axios";
import {
    BottomNav,
    NavButton
} from '../BookShelfStyled'

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
                const response = await axios.get(`http://${process.env.REACT_APP_API_URL}:3000/books/search?query=${queryParam}`, {
                    headers: {
                        'Cache-Control': 'no-cache'
                    }
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
        <Container>
            <GlobalStyle />
            <SearchBar>
                <SearchInput
                    type="text"
                    value={query}
                    onChange={handleSearchInputChange}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="검색어를 입력하세요"
                />
                <SearchIcon
                    src="/searchicon.png"
                    alt="search Icon"
                    onClick={() => query.trim() && navigate(`/searchresults?query=${query.trim()}`)}
                />
            </SearchBar>
            <ResultsHeader>
                <p>'{queryParam}' 검색 결과</p>
            </ResultsHeader>
            {loading ? (
                <p>검색 결과 불러오는 중...</p>
            ) : (
                <ResultsContainer>
                    {Array.isArray(sortedResults) && sortedResults.length > 0 ? (
                        sortedResults.map((book) => (
                            <BookItem key={book.isbn} onClick={() => navigate(`/bookdetail`, {
                                state: {
                                    title: book.title,
                                    authors: book.authors,
                                    publisher: book.publisher,
                                    isbn: book.isbn,
                                    thumbnail: book.thumbnail,
                                    content: book.contents,
                                }
                            })}>
                                <BookImage src={book.thumbnail} alt={book.title} />
                                <BookInfo>
                                    <p className="title">{book.title}</p>
                                    <p className="authors">
                                        {book.authors && book.authors.length > 0
                                            ? book.authors.join(', ')
                                            : '저자 정보 없음'}
                                    </p>
                                </BookInfo>
                            </BookItem>
                        ))
                    ) : (
                        <p>검색 결과가 없습니다.</p>
                    )}
                </ResultsContainer>
            )}
            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavButton active={true} onClick={() => navigate("/main")}>
                    <img src="/images/HomeIcon.svg" alt="홈"/>
                    <span>홈</span>
                </NavButton>
                <NavButton onClick={() => navigate("/to-read")}>
                    <img src="/images/BookcaseIcon.svg" alt="책장"/>
                    <span>책장</span>
                </NavButton>
                <NavButton onClick={() => navigate("/note")}>
                    <img src="/images/NoteIcon.svg" alt="노트"/>
                    <span>노트</span>
                </NavButton>
            </BottomNav>
        </Container>
    );    
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #f8f5eb;
    height: 100vh;
    padding: 20px;
    width: 353px;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 10px 15px;
    background-color: #fffdfa;
    width: 90%;
    max-width: 400px;
`;

const SearchInput = styled.input`
    flex-grow: 1;
    border: none;
    outline: none;
    padding: 10px;
    font-size: 14px;
    background-color: transparent;
    color: #666;
`;

const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 10px;
`;

const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 400px;
    margin-top: 10px;
    font-size: 18px;
    font-weight: bold;
`;

const ResultsContainer = styled.div`
    width: 90%;
    max-width: 400px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const BookItem = styled.button`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 10px;
    cursor: pointer;
`;


const BookImage = styled.img`
    width: 60px;
    height: 80px;
    border-radius: 5px;
    object-fit: cover;
    background-color: #eee;
`;

const BookInfo = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;
    text-align: left;

    .title {
        font-size: 15px;
        font-weight: bold;
        margin: 0;
    }

    .authors {
        font-size: 12px;
        color: #666;
        margin: 0;
    }
`;

export default SearchResultsPage;