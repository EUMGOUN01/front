import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/PostDetail.css'; // CSS 파일 import

const mockData = [
  { freeBoardId: 1, privateField: '공개', type: '공지', title: '첫번째 게시물', content: '내용1', img: '', username: 'admin', view: 10, createDate: '2024-08-01T00:00:00Z' },
  { freeBoardId: 2, privateField: '공개', type: '질문', title: '두번째 게시물', content: '내용2', img: '', username: 'user1', view: 20, createDate: '2024-08-02T00:00:00Z' },
  // ... 추가 데이터
];

const PostDetail = () => {
  const { id } = useParams(); // URL에서 게시물 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // 실제로는 서버에서 데이터 가져오는 로직이 필요합니다
    const fetchedPost = mockData.find(post => post.freeBoardId === parseInt(id)); // Mock data
    setPost(fetchedPost);
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment('');
    }
  };

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="post-detail-container">
      <h1 className="post-detail-title">{post.title}</h1>
      <div className="post-detail-meta">
        <p className="post-detail-info"><strong>카테고리:</strong> {post.type}</p>
        <p className="post-detail-info"><strong>작성자:</strong> {post.username}</p>
        <p className="post-detail-info"><strong>작성일:</strong> {new Date(post.createDate).toLocaleDateString()}</p>
        <p className="post-detail-info"><strong>조회수:</strong> {post.view}</p>
      </div>
      <div className="post-detail-content">{post.content}</div>
      {post.img && <img src={post.img} alt="Post" className="post-detail-img" />}
      
      <div className="post-detail-comments">
        <h2>댓글</h2>
        <div className="post-detail-comment-input">
          <textarea 
            value={comment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요..."
          />
          <button onClick={handleCommentSubmit} className="post-detail-comment-submit-button">댓글 작성</button>
        </div>
        <div className="post-detail-comment-list">
          {comments.map((com, index) => (
            <div key={index} className="post-detail-comment-item">
              {com}
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/board')} className="post-detail-back-button">목록으로 돌아가기</button>
    </div>
  );
};

export default PostDetail;