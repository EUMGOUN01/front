import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import '../CSS/BoardPage.css';
import Footer from './Footer';

const BoardPage = () => {
  const navigate = useNavigate();
  const [boardData] = useState([
    { id: 1, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 2, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 3, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 4, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 5, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 6, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 7, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 8, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 9, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 10, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 11, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 12, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 13, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 14, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 15, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 16, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 17, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 18, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 },
    { id: 19, category: '공지', title: '첫번째 게시물', author: 'admin', date: '2024-08-01', views: 10 },
    { id: 20, category: '질문', title: '두번째 게시물', author: 'user1', date: '2024-08-02', views: 20 }

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
          <div className="board-search-container">
            <div className="board-search-wrapper">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="board-search-input"
              />
              <CiSearch className="board-search-icon" />
            </div>
            <div className="board-button-container">
              <button onClick={handleSearch} className="board-search-button">검색</button>
              <button onClick={() => navigate('/write')} className="board-write-button">작성</button>
            </div>
          </div>
        </div>
        <table className="board-table">
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
                <td colSpan="6">게시물이 없습니다</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="board-pagination-container">
          <div className="board-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="board-page-button"
              aria-label="Previous Page"
            >
              이전
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <span
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`board-page-number ${currentPage === number + 1 ? 'active' : ''}`}
              >
                {number + 1}
              </span>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="board-page-button"
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