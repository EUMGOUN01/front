import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BoardPage = () => {
  const navigate = useNavigate();
  const [boardData] = useState([
    { id: 1, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 2, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 3, category: '공지', title: '세번째 게시물', author: 'admin', date: '2024-08-03', views: 5 },
    { id: 4, category: '질문', title: '네번째 게시물', author: 'user2', date: '2024-08-04', views: 15 },
    { id: 5, category: '기타', title: '다섯번째 게시물', author: 'user3', date: '2024-08-05', views: 25 },
    { id: 6, category: '공지', title: '여섯번째 게시물', author: 'admin', date: '2024-08-06', views: 8 },
    { id: 7, category: '질문', title: '일곱번째 게시물', author: 'user1', date: '2024-08-07', views: 18 },
    { id: 8, category: '기타', title: '여덟번째 게시물', author: 'user2', date: '2024-08-08', views: 12 },
    { id: 9, category: '공지', title: '아홉번째 게시물', author: 'admin', date: '2024-08-09', views: 30 },
    { id: 10, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    // Add more sample data as needed
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  // Filter posts based on search query
  const filteredPosts = boardData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = () => {
    setCurrentPage(1); // Reset to the first page on new search
  };

  return (
    <BoardContainer>
      <BoardHeader>
        <h2>자유 게시판</h2>
        <SearchContainer>
          <SearchInput
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="검색어를 입력하세요"
          />
          <SearchButton onClick={handleSearch}>조회</SearchButton>
        </SearchContainer>
      </BoardHeader>
      <Table>
        <thead>
          <tr>
            <th>번호</th>
            <th>말머리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{indexOfFirstPost + index + 1}</td>
              <td>{post.category}</td>
              <td>{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
              <td>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        <PageButton
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </PageButton>
        {[...Array(totalPages).keys()].map(number => (
          <PageNumber
            key={number + 1}
            onClick={() => handlePageChange(number + 1)}
            active={currentPage === number + 1}
          >
            {number + 1}
          </PageNumber>
        ))}
        <PageButton
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </PageButton>
      </Pagination>
      <WriteButton onClick={() => navigate('/write')}>글쓰기</WriteButton>
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: 40px auto; /* 중앙에 배치하기 위한 여백 추가 */
  position: relative;
`;

const BoardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 5px;
  font-size: 14px;
  margin-right: 5px;
`;

const SearchButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background-color: #004d40;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #00332a;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th, td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: center;
  }

  th {
    background-color: #f2f2f2;
  }
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px 0;
`;

const PageNumber = styled.span`
  margin: 0 5px;
  cursor: pointer;
  ${({ active }) => active && `
    font-weight: bold;
    text-decoration: underline;
  `}
`;

const PageButton = styled.button`
  margin: 0 5px;
  cursor: pointer;
  background: none;
  border: none;
  color: #004d40;
  font-size: 14px;

  &:disabled {
    color: #bbb;
    cursor: not-allowed;
  }
`;

const WriteButton = styled.button`
  padding: 5px 10px;
  font-size: 14px;
  background-color: #004d40;
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  right: 0;
  border-radius: 5px;

  &:hover {
    background-color: #00332a;
  }
`;

export default BoardPage;