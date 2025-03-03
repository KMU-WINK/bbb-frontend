import {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
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
} from './BookShelfStyled'

const BookDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const bookId = location.state?.bookId; // SearchPage에서 보낸 bookId 받기

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    // API 연동으로 책 정보 불러오기
    useEffect(() => {
        if (bookId) {
            fetch(``) // 백엔드 API 주소
                .then(res => res.json())
                .then((data) => {
                    setBook(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("error", err);
                    setLoading(false);
                })
        }
    }, [bookId]);

    const handleSearchClick = () => {
        navigate('/search');
    };

    const handleWishClick = () => {
        navigate('/to-read', { state: { book } });
    };

    const handleRegisterClick = () => {
        navigate('/reading', { state: { book } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <BookDetailWrapper>
            {/* 검색창 */}
            <SearchBar>
                <Logo src="/images/Logo.svg" alt="로고" />
                <SearchPlaceholder onClick={handleSearchClick}>
                    <span></span>
                    <img src="/images/SearchIcon.svg" alt="검색" className="icon" />
                </SearchPlaceholder>
            </SearchBar>

            {/* 메인 콘텐츠 */}
            {book && (
                <BookDetailContainer>
                    {/* 책 정보 박스 */}
                    <BookInfoBox>
                        <BookImage src={book.image} alt={book.title} />
                        <BookTitle>{book.title}</BookTitle>
                        <BookAuthor><strong>저자 정보</strong> {book.author}</BookAuthor>
                        <BookDescription><strong>소개</strong> {book.description}</BookDescription>
                    </BookInfoBox>

                    {/* 버튼 */}
                    <ButtonGroup>
                        <Button onClick={handleWishClick}>
                            <IconWrapper>
                                <img src="/images/HeartIcon.svg" alt="찜하기"/>
                            </IconWrapper>
                            <ButtonText>책 찜하기</ButtonText>
                        </Button>

                        <Button onClick={handleRegisterClick}>
                            <IconWrapper>
                                <img src="/images/RegisterIcon.svg" alt="등록하기"/>
                            </IconWrapper>
                            <ButtonText>책 등록하기</ButtonText>
                        </Button>
                    </ButtonGroup>
                </BookDetailContainer>
            )}

            {/* 하단 네비게이션 */}
            <BottomNav>
                <NavButton onClick={() => navigate("/")}>
                    <img src="/images/HomeIcon.svg" alt="홈"/>
                    <span>홈</span>
                </NavButton>
                <NavButton onClick={() => navigate("/to-read")}>
                    <img src="/images/BookcaseIcon.svg" alt="책장"/>
                    <span>책장</span>
                </NavButton>
                <NavButton onClick={() => navigate("/note")} className="nav-button">
                    <img src="/images/NoteIcon.svg" alt="노트"/>
                    <span>노트</span>
                </NavButton>
            </BottomNav>
        </BookDetailWrapper>
    );
};

export default BookDetail;