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

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // FormData 객체를 생성하여 데이터를 추가합니다.
    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('content', content);
    if (file) {
      formData.append('file', file);
    }

    try {
      // POST 요청을 통해 데이터를 서버에 전송합니다.
      await axios.post('/api/freeboard', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // 성공적으로 전송된 후 게시판 목록 페이지로 이동합니다.
      navigate('/board');
    } catch (error) {
      console.error('게시물을 작성하는 데 실패했습니다.', error);
    }
  };

  return (
    <div className="write-container">
      <form className="write-form" onSubmit={handleSubmit}>
        <h2 className="write-page-title">자유 게시판</h2>
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