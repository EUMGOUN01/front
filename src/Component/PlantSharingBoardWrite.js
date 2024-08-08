import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/PlantSharingBoardWrite.css';

const PlantSharingBoardWrite = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch('http://localhost:8080/api/shareboard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, content }),
      });
      navigate('/plant-sharing');
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className="plant-sharing-board-write-container">
      <h1>식물 나눔 글쓰기</h1>
      <form onSubmit={handleSubmit} className="plant-sharing-board-write-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">카테고리</label>
          <input
            type="text"
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">작성 완료</button>
      </form>
    </div>
  );
};

export default PlantSharingBoardWrite;