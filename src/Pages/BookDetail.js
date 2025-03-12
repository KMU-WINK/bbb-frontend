import { useState } from "react";
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
    ButtonText,
} from './BookShelfStyled';

const BookDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { title, authors, publisher, isbn, thumbnail, content } = location.state || {};
    const [isRequesting, setIsRequesting] = useState(false);

    const token = '';

    const HandleWish = (e) => {
        e.preventDefault();
        if (isRequesting) return;
        setIsRequesting(true);
        console.log("찜하기 버튼 클릭됨");  // 디버깅 로그
        axios.post(`http://${process.env.REACT_APP_API_URL}:3000/wishlist`,
            { title, authors, publisher, isbn, thumbnail },
            {
                headers: {
                    'Cache-Control': 'no-cache',
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                console.log(res.data);
                navigate('/to-read');  // 찜하기 후 /to-read로 이동
            })
            .catch((err) => {
                console.error("POST /wishlist API 요청 중 에러 발생", err);
            })
            .finally(() => {
                setIsRequesting(false);
            })
    }

    const HandleRegister = (e) => {
        e.preventDefault();
        axios.post(`http://${process.env.REACT_APP_API_URL}:3000/registerlist`,
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
                    <span></span>
                    <img src="/images/SearchIcon.svg" alt="검색" className="icon" />
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
                <NavButton active={true} onClick={() => navigate("/")}>
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
        </BookDetailWrapper>
    );
};

export default BookDetail;