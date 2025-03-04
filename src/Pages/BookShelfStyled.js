import styled from 'styled-components';

{/* 검색창 */}
export const SearchBar = styled.div`
  width: 100%;
  height: 56px;
  background-color: #F0EDDE;
  display: flex;
  align-items: center;
  padding: 0 8px;
  box-sizing: border-box;
`;

export const Logo = styled.img`
  width: 50px;
  height: 29.84px;
`;

export const SearchPlaceholder = styled.div`
  flex: 1;
  height: 40px;
  background-color: #FFFDFA;
  border-radius: 20px;
  display: flex;
  align-items: center;
  margin-left: 8px;
  padding: 0 10px;
  cursor: pointer;

  span {
    color: #888;
    flex: 1;
  }

  .icon {
    width: 24.32px;
    height: 25px;
  }
`;

{/* 하단 내비게이션 바 */}
export const BottomNav = styled.nav`
  width: 100%;
  height: 80px;
  background-color: #F0EDDE;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const NavButton = styled.button`
  width: 131px;
  height: 80px;
  background-color: ${({ active }) => (active ? '#D8D3C2' : '#F0EDDE')};
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
    margin-bottom: 5px;
  }

  span {
    color: #2A392A;
    font-size: 15px;
  }
`;

{/* 책 상세 페이지 */}
export const BookDetailWrapper = styled.div`
  width: 393px;
  height: 758px;
  margin: 0 auto;
  background-color: #FDFDF8;
  display: flex;
  flex-direction: column;
`;

export const BookDetailContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
`;

export const BookInfoBox = styled.div`
  width: 326px;
  height: 460px;
  background-color: #F8F5EB;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const BookImage = styled.img`
  width: 150px;
  height: 220px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  align-self: center;
`;

export const BookTitle = styled.h2`
  font-size: 20px;
  margin: 10px 0;
  color: #333;
  align-self: center;
`;

export const BookAuthor = styled.p`
  font-size: 16px;
  color: #555;
  text-align: left;
  width: 100%;
`;

export const BookDescription = styled.p`
  font-size: 16px;
  color: #555;
  text-align: left;
  width: 100%;
  margin-top: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  margin-top: 20px;
`;

export const Button = styled.button`
  width: 175px;
  height: 58px;
  background-color: #F8F5EB;
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  border: none;
  cursor: pointer;
  font-weight: 600;
`;

export const IconWrapper = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #ffffff80;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const ButtonText = styled.span`
  font-size: 16px;
  color: #000;
  font-weight: 600;
  padding: 10px;
`;

{/* 독서 상태 창 */}
export const ReadingStatusBar = styled.div`
    width: 393px;
    height: 60px;
    background-color: #F0EDDE;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

export const StatusButton = styled.button`
    width: 118px;
    height: 36px;
    background-color: ${({ active }) => (active ? '#D8D3C2' : '#F8F5EB')};
    border: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 8px;
    border-radius: 30px;
    cursor: pointer;
`;

export const StatusIconWrapper = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const StatusText = styled.span`
    font-size: 14px;
    font-weight: 600;
    margin-left: 5px;
`;

export const ArrowIcon = styled.img`
    width: 16px;
    height: 16px;
`;

export const BookList = styled.div`
    height: 80%;
    display: flex;
    justify-content: space-around;
    padding: 20px;
`;

export const BookItem = styled.div`
    img {
        width: 100px;
        height: 150px;
        border-radius: 10px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        cursor: pointer;
    }
`;

{/* 읽은 책 페이지 */}
export const ReadWrapper = styled.div`
    width: 393px;
    height: 758px;
    margin: 0 auto;
    background-color: #FDFDF8;
    display: flex;
    flex-direction: column;
    position: relative;
`;

{/* 읽는 중 페이지 */}
export const ReadingWrapper = styled.div`
    width: 393px;
    height: 758px;
    margin: 0 auto;
    background-color: #FDFDF8;
    display: flex;
    flex-direction: column;
    position: relative;
`;

{/* 읽을 책 페이지 */}
export const ToReadWrapper = styled.div`
    width: 393px;
    height: 758px;
    margin: 0 auto;
    background-color: #FDFDF8;
    display: flex;
    flex-direction: column;
    position: relative;
`;