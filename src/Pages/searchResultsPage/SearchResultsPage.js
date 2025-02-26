import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import GlobalStyle from "../../GlobalStyle";

const SearchResultsPage = () => {
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");

    const results = [
        { id: 1, title: "제목", author: "저자", rating: 5 },
        { id: 2, title: "제목", author: "저자", rating: 4 },
        { id: 3, title: "제목", author: "저자", rating: 4.5 },
    ];

    return React.createElement(
        Container,
        null,
        React.createElement(GlobalStyle),
        React.createElement(
            SearchBar,
            null,
            React.createElement(SearchInput, {
                type: "text",
                value: query || "",
                readOnly: true,
            }),
            React.createElement(SearchIcon, {
                src: "/searchicon.png",
                alt: "search Icon",
            })
        ),
        React.createElement(
            ResultsHeader,
            null,
            React.createElement("p", null, `'${query}' 검색 결과`),
            React.createElement(SortButton, null, "별점순 ▼")
        ),
        React.createElement(
            ResultsContainer,
            null,
            results.map((book) =>
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
`;

const ResultsHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 400px;
    margin-top: 20px;
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
