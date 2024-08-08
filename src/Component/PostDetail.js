import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const mockData = [
  { freeBoardId: 1, privateField: '공개', type: '공지', title: '첫번째 게시물', content: '내용1', img: '', username: 'admin', view: 10, createDate: '2024-08-01T00:00:00Z' },
  { freeBoardId: 2, privateField: '공개', type: '질문', title: '두번째 게시물', content: '내용2', img: '', username: 'user1', view: 20, createDate: '2024-08-02T00:00:00Z' },
  // ... 추가 데이터
];

const PostDetail = () => {
  const { id } = useParams(); // URL에서 게시물 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // 실제로는 서버에서 데이터 가져오는 로직이 필요합니다
    const fetchedPost = mockData.find(post => post.freeBoardId === parseInt(id)); // Mock data
    setPost(fetchedPost);
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="post-detail-container">
      <button onClick={() => navigate('/board')} className="back-button">목록으로 돌아가기</button>
      <h1>{post.title}</h1>
      <p><strong>카테고리:</strong> {post.type}</p>
      <p><strong>작성자:</strong> {post.username}</p>
      <p><strong>작성일:</strong> {new Date(post.createDate).toLocaleDateString()}</p>
      <p><strong>조회수:</strong> {post.view}</p>
      <p><strong>내용:</strong> {post.content}</p>
      {/* 이미지가 있을 경우 렌더링 */}
      {post.img && <img src={post.img} alt="Post" />}
    </div>
  );
};

export default PostDetail;