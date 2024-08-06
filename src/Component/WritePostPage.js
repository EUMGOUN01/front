import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/WritePostPage.css';

const WritePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      content,
      author: 'user', 
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    console.log('New Post:', newPost);
    navigate('/board');
  };

  return (
    <div className="container">
      <h2>글쓰기</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label">
          제목:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </label>
        <label className="label">
          카테고리:
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="select">
            <option value="공지">공지</option>
            <option value="질문">질문</option>
            <option value="기타">기타</option>
          </select>
        </label>
        <label className="label">
          내용:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="textarea"
            required
          />
        </label>
        <button type="submit" className="button">저장</button>
      </form>
    </div>
  );
};

export default WritePostPage;