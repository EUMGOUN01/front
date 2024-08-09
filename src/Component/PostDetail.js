import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../CSS/WritePostPage.css'; // CSS 파일 경로

const WritePostPage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  // 파일 선택 시 호출되는 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      // 파일 형식 검증
      if (!selectedFile.type.startsWith('image/')) {
        setError('이미지 파일만 업로드할 수 있습니다.');
        return;
      }

      // 파일 크기 제한 (예: 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('파일 크기는 5MB를 초과할 수 없습니다.');
        return;
      }

      setError('');
      setFile(selectedFile);
    }
  };

  // 폼 제출 시 호출되는 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError('제목과 내용을 입력해야 합니다.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('/api/freeboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/board');
    } catch (error) {
      console.error('게시물을 작성하는 데 실패했습니다.', error);
      setError('게시물을 작성하는 데 실패했습니다.');
    }
  };

  return (
    <div className="write-container">
      <form className="write-form" onSubmit={handleSubmit}>
        <h2 className="write-page-title">자유 게시판</h2>
        {error && <p className="error-message">{error}</p>}
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
          제목:
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
          내용:
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
        <button type="submit" className="write-button">작성</button>
      </form>
    </div>
  );
};

export default WritePostPage;