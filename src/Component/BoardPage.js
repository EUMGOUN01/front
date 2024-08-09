import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CiSearch } from 'react-icons/ci';
import '../CSS/BoardPage.css';
import Footer from './Footer';

const BoardPage = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 15;

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get('/public/freeboard', {
          params: {
            page: currentPage,
            size: postsPerPage
          }
        });
        setBoardData(response.data.content); 
      } catch (error) {
        console.error('게시물을 불러오는 데 실패했습니다.', error);
      }
    };

    fetchBoardData();
  }, [currentPage]); 

  const filteredPosts = useMemo(() => boardData.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  ), [boardData, searchQuery]);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = useMemo(() => filteredPosts.slice(indexOfFirstPost, indexOfLastPost), [filteredPosts, indexOfFirstPost, indexOfLastPost]);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
  };

  useEffect(() => {
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
              <th>카테고리</th>
              <th>제목</th>
              <th>작성자</th>
              <th>작성일</th>
              <th>조회수</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts.length > 0 ? (
              currentPosts.map((post, index) => (
                <tr
                  key={post.free_board_id}
                  onClick={() => navigate(`/post/${post.free_board_id}`)}
                  className="board-row"
                >
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.type}</td>
                  <td>{post.title}</td>
                  <td>{post.username}</td>
                  <td>{new Date(post.create_date).toLocaleDateString()}</td>
                  <td>{post.view}</td>
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
              disabled={currentPage === 0}
              className="board-page-button"
              aria-label="Previous Page"
            >
              이전
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <span
                key={number}
                onClick={() => handlePageChange(number)}
                className={`board-page-number ${currentPage === number ? 'active' : ''}`}
              >
                {number + 1}
              </span>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages - 1}
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