import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/PlantDetail.css';

const mockData = [
  { share_board_id: 1, type: '나눔', title: '첫번째 식물 나눔', username: 'admin', createdate: '2024-08-01', view: 10, content: '이것은 첫 번째 식물 나눔 게시물의 내용입니다.' },
  { share_board_id: 2, type: '나눔중', title: '두번째 식물 교환', username: 'user1', createdate: '2024-08-02', view: 20, content: '이것은 두 번째 식물 교환 게시물의 내용입니다.' },
  { share_board_id: 3, type: '나눔', title: '세번째 식물 나눔', username: 'admin', createdate: '2024-08-03', view: 15, content: '이것은 세 번째 식물 나눔 게시물의 내용입니다.' },
  // ... 추가 데이터
];

const PlantDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const mapRef = useRef(null);

  useEffect(() => {
    if (!id || isNaN(id)) {
      setError('유효하지 않은 게시물 ID입니다.');
      setLoading(false);
      return;
    }

    const fetchData = () => {
      const fetchedPost = mockData.find(post => post.share_board_id === parseInt(id, 10));
      if (fetchedPost) {
        setPost(fetchedPost);
      } else {
        setError('게시물을 찾을 수 없습니다.');
      }
      setLoading(false);
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao || !post) return;

    const mapOptions = {
      center: new kakao.maps.LatLng(35.1587, 129.1601), // 기본 위치
      level: 3,
    };

    mapRef.current = new kakao.maps.Map(document.getElementById('map'), mapOptions);

    // 게시물의 위치에 마커 추가
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(35.1587, 129.1601) // 예시 좌표, 실제로는 게시물 위치로 설정
    });
    marker.setMap(mapRef.current);

    return () => {
      if (mapRef.current) {
        mapRef.current = null;
      }
    };
  }, [post]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, content: newComment }]);
      setNewComment('');
    }
  };

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생: {error}</div>;
  if (!post) return <div>게시물을 찾을 수 없습니다.</div>;

  return (
    <div className="plant-detail-container">
      <h1>{post.title}</h1>
      <p><strong>카테고리:</strong> {post.type}</p>
      <p><strong>작성자:</strong> {post.username}</p>
      <p><strong>작성일:</strong> {new Date(post.createdate).toLocaleDateString()}</p>
      <p><strong>조회수:</strong> {post.view}</p>
      <p>{post.content}</p>

      <div id="map" style={{ width: '100%', height: '300px', marginBottom: '20px' }}></div>

      <div className="comments-section">
        <h2>댓글</h2>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="댓글을 입력하세요..."
            rows="4"
          />
          <button type="submit">댓글 작성</button>
        </form>
        <div className="comments-list">
          {comments.map(comment => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
      </div>

      <button onClick={() => navigate('/plant-sharing')} className="back-button">목록으로 돌아가기</button>
    </div>
  );
};

export default PlantDetail;