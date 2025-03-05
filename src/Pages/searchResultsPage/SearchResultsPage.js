import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import GlobalStyle from "../../GlobalStyle";

const SearchResultsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParam = new URLSearchParams(location.search).get("query");

    const [query, setQuery] = useState(queryParam || "");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortType, setSortType] = useState("rating"); // 기본값: 별점순

    useEffect(() => {
        if (!queryParam) return;

        const fetchResults = async () => {
            try {
                const response = await fetch(`https://your-api.com/search?query=${queryParam}`);
                const data = await response.json();
                setResults(data);
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

    const handleSortChange = () => {
        setSortType((prevSort) => (prevSort === "rating" ? "title" : "rating"));
    };

    const sortedResults = [...results].sort((a, b) => {
        if (sortType === "rating") return b.rating - a.rating; // 별점 높은 순
        if (sortType === "title") return a.title.localeCompare(b.title, "ko-KR"); // 가나다 순
        return 0;
    });

    return React.createElement(
        Container,
        null,
        React.createElement(GlobalStyle),
        React.createElement(
            SearchBar,
            null,
            React.createElement(SearchInput, {
                type: "text",
                value: query,
                onChange: handleSearchInputChange,
                onKeyDown: handleSearchKeyDown,
                placeholder: "검색어를 입력하세요",
            }),
            React.createElement(SearchIcon, {
                src: "/searchicon.png",
                alt: "search Icon",
                onClick: () => query.trim() && navigate(`/searchresults?query=${query.trim()}`),
            })
        ),
        React.createElement(
            ResultsHeader,
            null,
            React.createElement("p", null, `'${queryParam}' 검색 결과`),
            React.createElement(SortButton, { onClick: handleSortChange }, sortType === "rating" ? "별점순 ▼" : "가나다순 ▼")
        ),
        loading
            ? React.createElement("p", null, "검색 결과 불러오는 중...")
            : React.createElement(
                ResultsContainer,
                null,
                sortedResults.length > 0
                    ? sortedResults.map((book) =>
                            React.createElement(
                                BookItem,
                                { key: book.id },
                                React.createElement(BookImage),
                                React.createElement(
                                    BookInfo,
                                    null,
                                    React.createElement("p", { className: "title" }, book.title),
                                    React.createElement("p", { className: "author" }, book.author),
                                    React.createElement(StarRating, { rating: book.rating })
                                )
                            )
                        )
                    : React.createElement("p", null, "검색 결과가 없습니다.")
            ),
        React.createElement(NavBar)
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
    width: 100%;
    max-width: 400px;
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

const SortButton = styled.button`
    background-color: #fffdfa;
    border: 1px solid #ccc;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    height: 40px;
    margin-top: 10px;
`;

const ResultsContainer = styled.div`
    width: 90%;
    max-width: 400px;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const BookItem = styled.div`
    display: flex;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
`;

const BookImage = styled.div`
    width: 60px;
    height: 80px;
    background-color: #eee;
    border-radius: 5px;
`;

const BookInfo = styled.div`
    margin-left: 10px;
    display: flex;
    flex-direction: column;

    .title {
        font-size: 16px;
        font-weight: bold;
    }

    .author {
        font-size: 14px;
        color: #666;
    }
`;

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    return React.createElement(
        StarContainer,
        null,
        [...Array(fullStars)].map((_, i) =>
            React.createElement("span", { key: i }, "⭐")
        ),
        halfStar && React.createElement("span", null, "⭐️")
    );
};

const StarContainer = styled.div`
    color: #ffcc00;
    font-size: 14px;
`;

export default SearchResultsPage;
