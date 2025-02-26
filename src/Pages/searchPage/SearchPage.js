import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import GlobalStyle from "../../GlobalStyle";

const SearchPage = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    return React.createElement(
        Container,
        null,
        React.createElement(GlobalStyle),
        React.createElement(SearchText, null, React.createElement("p", null, "검색")),
        React.createElement(
            SearchContainer,
            null,
            React.createElement(
                SearchBar,
                null,
                React.createElement(SearchInput, {
                    type: "text",
                    placeholder: "도서명, 저자, 출판사, ISBN 등을 검색해 보세요",
                    value: searchTerm,
                    onChange: (e) => setSearchTerm(e.target.value),
                    onKeyDown: (e) => { // 수정된 부분
                        if (e.key === "Enter" && searchTerm.trim())  {
                            navigate(`/searchresults?query=${searchTerm}`);
                        }
                    }
                }),
                React.createElement(SearchIcon, {
                    src: "/searchicon.png",
                    alt: "search Icon",
                    onClick: () => navigate(`/searchresults?query=${searchTerm}`)
                })
            )
        ),
        React.createElement(
            LogoContainer,
            null,
            React.createElement(Logo, {
                src: "/logo.png",
                alt: "App Logo",
                style: { width: "250px", height: "180px", opacity: 0.3, marginTop: "50px" },
            })
        ),
        React.createElement(NavBar)
    );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 20px;
    max-width: 400px;
    width: 100%;
    background-color: #f8f5eb;
    height: 100vh;
`;

const SearchText = styled.div`
    font-size: 22px;
    font-weight: normal;
    color: #121212;
    align-self: flex-start;
    margin-bottom: -20px;
    margin-top: -20px;
`;

const SearchContainer = styled.div`
    display: flex;
    justify-content: center;
    max-width: 400px;
    width: 100%;
    padding: 10px 0;
`;

const SearchBar = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 30px;
    padding: 10px 15px;
    background-color: #fffdfa;
    width: 100%;
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
    &::placeholder {
        color: #bbb;
    }
`;

const SearchIcon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const LogoContainer = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100%;
`;

const Logo = styled.img`
    width: 250px;
    height: 180px;
    opacity: 0.3;
`;

export default SearchPage;
