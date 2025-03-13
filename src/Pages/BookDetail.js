import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    SearchBar,
    Logo,
    SearchPlaceholder,
    BottomNav,
    NavButton,
    BookDetailWrapper,
    BookDetailContainer,
    BookInfoBox,
    BookImage,
    BookTitle,
    BookAuthor,
    BookDescription,
    ButtonGroup,
    Button,
    IconWrapper,
    ButtonText, SearchInput, SearchIcon
} from './BookShelfStyled';

const BookDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, authors, publisher, isbn, thumbnail, content } = location.state || {};
    const [isRequesting, setIsRequesting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim()) {
            navigate(`/searchresults?query=${searchTerm}`);
        }
    };

    const token = localStorage.getItem('token');

    const HandleWish = (e) => {
        e.preventDefault();
        if (isRequesting) return;
        setIsRequesting(true);

        const bookData = { title, authors, publisher, isbn, thumbnail };

        axios.post(`http://${process.env.REACT_APP_API_URL}:3000/wishlist`, bookData, {
            headers: {
                'Cache-Control': 'no-cache',
                Authorization: `Bearer ${token}`
            }
        })
          .then((res) => {
              console.log("응답 상태 코드:", res.status);
              if (res.status === 200) {
                  console.log("책이 성공적으로 추가되었습니다.");
                  navigate('/to-read');  // 이동할 페이지
              } else {
                  console.error("책 추가 실패: 상태 코드", res.status);
              }
          })
          .catch((err) => {
              console.error("책 추가 중 에러 발생", err);
          })
          .finally(() => {
              setIsRequesting(false);
          });
    };

    const HandleRegister = (e) => {
        e.preventDefault();
        axios.post(`http://10.30.113.126:3000/registerlist`,
            { title, authors, publisher, isbn, thumbnail },
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data);
                navigate('/reading');  // 등록하기 후 /reading으로 이동
            })
            .catch((err) => {
                console.error("POST /registerlist API 요청 중 에러 발생", err);
            })
    }

    return (
        <BookDetailWrapper>
            {/* 검색창 */}
            <SearchBar>
                <Logo src="/images/Logo.svg" alt="로고" />
                <SearchPlaceholder onClick={() => navigate('/search')}>
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

            {/* 메인 콘텐츠 */}
            <BookDetailContainer>
                {/* 책 정보 박스 */}
                <BookInfoBox>
                    <BookImage src={thumbnail} alt={title} />
                    <BookTitle>{title}</BookTitle>
                    <BookAuthor>저자 정보 | {authors}</BookAuthor>
                    <BookDescription>소개 | {content}</BookDescription>
                </BookInfoBox>

                {/* 버튼 */}
                <ButtonGroup>
                    <Button onClick={HandleWish} disabled={isRequesting}>
                        <IconWrapper>
                            <img src="/images/HeartIcon.svg" alt="찜하기"/>
                        </IconWrapper>
                        <ButtonText>찜하기</ButtonText>
                    </Button>

                    <Button onClick={HandleRegister}>
                        <IconWrapper>
                            <img src="/images/RegisterIcon.svg" alt="등록하기"/>
                        </IconWrapper>
                        <ButtonText>등록하기</ButtonText>
                    </Button>
                </ButtonGroup>
            </BookDetailContainer>

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
                <NavButton onClick={() => navigate("/bookmemo")}>
                    <img src="/images/NoteIcon.svg" alt="노트"/>
                    <span>노트</span>
                </NavButton>
            </BottomNav>
        </BookDetailWrapper>
    );
};

export default BookDetail;


