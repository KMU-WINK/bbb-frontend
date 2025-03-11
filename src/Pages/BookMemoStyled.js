import styled from "styled-components";

export const Container = styled.div`
  width: 393px;
  height: 758px;
  margin: 0 auto;
  background-color: #FDFDF8;
  display: flex;
  flex-direction: column;
  position: relative;
`;

// 검색 관련 컴포넌트
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

// 하단 바 관련 컴포넌트
export const BottomNav = styled.nav`
  width: 393px;
  height: 80px;
  background-color: #F0EDDE;
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: fixed;
  bottom: 0;
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

// 메모 관련 컴포넌트
export const MemoEditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`;

export const MemoList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-bottom: 80px;
`;

export const MemoItem = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
`;

export const MemoContent = styled.div`
  flex: 1;
  background: #fffcf5;
  height: 90%;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
`;

export const MemoText = styled.p`
  font-size: 14px;
  font-weight: bold;
  margin: 0 0 5px 0;
`;

export const MemoInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const MemoDate = styled.small`
  display: block;
  margin-top: 5px;
  color: #777;
`;

export const EmptyMessage = styled.p`
  text-align: center;
  color: #aaa;
  margin-top: 50px;
`;

// 레코드 관련 컴포넌트
export const BookCard = styled.div`
  background: #f8f6ef;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
`;

export const BookImage = styled.div`
  width: 50px;
  height: 70px;
  background: #ddd;
  margin-right: 16px;
`;

export const AboutCard = styled.div`
    display: flex;
    flex-direction: column;
    margin: 10px;
    gap: 5px;
`;

export const RecordText = styled.div`
    font-size: 16px;
    text-align: center;
    padding: 5px;
`

export const RecordEditButton = styled.button`
    width: 393px;
    padding: 12px;
    background: green;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    position: fixed;
    bottom: 80px;
    margin-bottom: 10px;
`;

// 책 표지 컴포넌트
export const BookCover = styled.img`
    width: 100px;
    height: auto;
    border-radius: 6px;
`;