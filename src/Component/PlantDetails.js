// src/Component/PlantDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';


const PlantDetails = () => {
  const { id } = useParams(); // URL에서 게시물 ID 가져오기
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    // 실제로는 서버에서 데이터 가져오는 로직이 필요합니다
    const fetchedPost = { share_board_id: 1, type: '나눔', title: '첫번째 식물 나눔', username: 'admin', createdate: '2024-08-01', view: 10 }; // Mock data
    setPost(fetchedPost);
  }, [id]);

  if (!post) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="plant-detail-container">
      <button onClick={() => navigate('/plant-sharing')} className="back-button">목록으로 돌아가기</button>
      <h1>{post.title}</h1>
      <p><strong>카테고리:</strong> {post.type}</p>
      <p><strong>작성자:</strong> {post.username}</p>
      <p><strong>작성일:</strong> {new Date(post.createdate).toLocaleDateString()}</p>
      <p><strong>조회수:</strong> {post.view}</p>
      <p>{/* 여기에 게시물의 내용을 추가합니다. */}</p>
    </div>
  );
};

export default PlantDetails;