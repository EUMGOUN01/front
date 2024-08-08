import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import '../CSS/PlantSharingBoard.css';
import Footer from './Footer';

const PlantSharingBoard = () => {
  const navigate = useNavigate();
  const [boardData, setBoardData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 15;

  // Function to load board data
  const loadBoard = async () => {
    try {
      const response = await fetch('http://localhost:8080/public/shareboard');
      const result = await response.json();
      setBoardData(result);
    } catch (error) {
      console.error('Error fetching Board:', error);
    }
  };

  useEffect(() => {
    loadBoard(); // Load board data on component mount
  }, []);

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

  return (
    <>
      <div className="plant-sharing-board-container">
        <div className="plant-sharing-board-header">
          <h1>식물 나눔 게시판</h1>
          <div className="plant-sharing-board-search-container">
            <div className="plant-sharing-board-search-wrapper">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="검색어를 입력하세요"
                className="plant-sharing-board-search-input"
              />
              <CiSearch className="plant-sharing-board-search-icon" />
            </div>
            <div className="plant-sharing-board-button-container">
              <button onClick={handleSearch} className="plant-sharing-board-search-button">검색</button>
              <button onClick={() => navigate('/plant-sharing/write')} className="plant-sharing-board-write-button">작성</button>
            </div>
          </div>
        </div>
        <table className="plant-sharing-board-table">
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
                <tr key={post.share_board_id}>
                  <td>{indexOfFirstPost + index + 1}</td>
                  <td>{post.type}</td>
                  <td>{post.title}</td>
                  <td>{post.username}</td>
                  <td>{post.createdate.split('T')[0]}</td>
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
        <div className="plant-sharing-board-pagination-container">
          <div className="plant-sharing-board-pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="plant-sharing-board-page-button"
              aria-label="Previous Page"
            >
              이전
            </button>
            {[...Array(totalPages).keys()].map(number => (
              <span
                key={number + 1}
                onClick={() => handlePageChange(number + 1)}
                className={`plant-sharing-board-page-number ${currentPage === number + 1 ? 'active' : ''}`}
              >
                {number + 1}
              </span>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="plant-sharing-board-page-button"
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

export default PlantSharingBoard;