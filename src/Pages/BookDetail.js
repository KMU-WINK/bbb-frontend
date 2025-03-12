import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    BookDetailWrapper,
    SearchBar,
    Logo,
    SearchPlaceholder,
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
    BottomNav,
    NavButton,
} from './BookShelfStyled';

const BookDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const book = location.state?.book; // 📌 SearchPage에서 전달된 책 정보

    if (!book) {
        return <div>책 정보를 불러올 수 없습니다.</div>;
    }

    // 📌 책을 DB에 저장 (읽는 중 or 찜 목록)
    const saveBookToDB = async (endpoint) => {
        try {
            // 주어진 토큰
            const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhc0BhLmNvbSIsImlhdCI6MTc0MTY2MjY4MSwiZXhwIjoxNzQxNjY2MjgxfQ.VY-fhVvHBOtkacnHuyN5-752wzrBWOqEhdc_RSYjrAI";

            // axios 요청 시 헤더에 토큰 추가
            await axios.post(`http://10.221.35.189:3000/${endpoint}`, {
                // bookId: book.id,  // 이미 받은 book 데이터 활용
                title: book.title,
                author: book.author,
                thumbnail: book.thumbnail,
                contents: book.contents,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 추가
                },
            });

            // 저장 후 해당 페이지로 이동
            if (endpoint === 'registerlist') {
                navigate('/reading');
            } else if (endpoint === 'wishlist') {
                navigate('/to-read');
            }
        } catch (e) {
            console.error("책 저장 실패", e);
        }
    };

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
                    <BookImage src={book.thumbnail} alt={book.title} />
                    <BookTitle>{book.title}</BookTitle>
                    <BookAuthor><strong>저자 정보</strong> {book.author}</BookAuthor>
                    <BookDescription><strong>소개</strong> {book.contents}</BookDescription>
                </BookInfoBox>

                {/* 버튼 */}
                <ButtonGroup>
                    <Button onClick={() => saveBookToDB('registerlist')}>
                        <IconWrapper>
                            <img src="/images/HeartIcon.svg" alt="찜하기"/>
                        </IconWrapper>
                        <ButtonText>책 찜하기</ButtonText>
                    </Button>

                    <Button onClick={() => saveBookToDB('wishlist')}>
                        <IconWrapper>
                            <img src="/images/RegisterIcon.svg" alt="등록하기"/>
                        </IconWrapper>
                        <ButtonText>책 등록하기</ButtonText>
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