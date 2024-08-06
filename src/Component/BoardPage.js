import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/BoardPage.css';
import Footer from './Footer';

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
    { id: 11, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 12, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 13, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 14, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 15, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 16, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 17, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 18, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 19, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 20, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 21, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 22, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 23, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 24, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 25, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 26, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 27, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
    { id: 28, category: '질문', title: '열번째 게시물', author: 'user3', date: '2024-08-10', views: 22 },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  const filteredPosts = useMemo(() => boardData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  ), [boardData, searchQuery]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => filteredPosts.slice(indexOfFirstPost, indexOfLastPost), [filteredPosts, indexOfFirstPost, indexOfLastPost]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };


  React.useEffect(() => {
    document.title = "자유 게시판"; 
  }, []);

  return (
    <>
      <div className="board-container">
        <div className="board-header">
          <h1>자유 게시판</h1> 
          <div className="search-container">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="검색어를 입력하세요"
              className="search-input"
            />
            <div className = "button-container">
            <button onClick={handleSearch} className="search-button">조회</button> 
            <button onClick={() => navigate('/write')} className="write-button">글쓰기</button>
          </div>
          </div>
        </div>
        <table className="table">
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
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <tr key={post.id}>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.category}</td>
                  <td>{post.title}</td>
                  <td>{post.author}</td>
                  <td>{post.date}</td>
                  <td>{post.views}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No posts available</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="pagination-container">
          <div className="pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="page-button"
              aria-label="Previous Page"
            >
              이전
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <span
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`page-number ${currentPage === number + 1 ? 'active' : ''}`}
              >
                {number + 1}
              </span>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="page-button"
              aria-label="Next Page"
            >
              다음
            </button>
          </div>
       
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BoardPage;