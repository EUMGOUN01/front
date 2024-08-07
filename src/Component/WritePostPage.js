import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/WritePostPage.css'; // CSS 파일 경로

const WritePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      title,
      category,
      content,
      author: 'user',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      fileName: file ? file.name : null, // 파일 이름 저장
    };
    console.log('New Post:', newPost);
    navigate('/board');
  };

  return (
    <div className="write-container">
      <form className="write-form" onSubmit={handleSubmit}>
        <h2 className="write-page-title">글쓰기</h2>
        <div className="form-group">
          <label className="label">
            카테고리:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="write-select"
            >
              <option value="공지">공지</option>
              <option value="질문">질문</option>
              <option value="기타">기타</option>
            </select>
          </label>
        </div>
        <label className="label">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="write-input"
            placeholder="제목을 입력하세요"
            required
          />
        </label>
        <label className="label">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="write-textarea"
            placeholder="내용을 입력하세요"
            required
          />
        </label>
        <label className="label">
          첨부 파일:
          <input
            type="file"
            onChange={handleFileChange}
            className="write-file-input"
          />
        </label>
        <button type="submit" className="write-button">저장하기</button>
      </form>
    </div>
  );
};

export default WritePostPage;