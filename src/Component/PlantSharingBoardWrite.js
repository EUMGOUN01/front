import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/PlantSharingBoardWrite.css'; // CSS 파일 경로

const PlantSharingBoardWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('공지');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [searchAddress, setSearchAddress] = useState('');
  const mapContainer = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

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
    navigate('/plant-sharing'); // 사용자가 게시글 작성 후 이동할 경로
  };

  const searchMap = () => {
    const { kakao } = window;
    if (!kakao) return;

    const ps = new kakao.maps.services.Places();
    const placesSearchCB = function(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        const newSearch = data[0];
        const latlng = new kakao.maps.LatLng(newSearch.y, newSearch.x);

        // 지도 중심 위치 업데이트
        if (mapRef.current) {
          mapRef.current.setCenter(latlng);
          mapRef.current.setLevel(3); // 줌 레벨을 3으로 설정하여 더 가까이 보기
        } else {
          const mapOptions = {
            center: latlng,
            level: 3, // 줌 레벨을 3으로 설정하여 더 가까이 보기
          };
          mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);
        }

        // 마커 업데이트
        if (markerRef.current) {
          markerRef.current.setPosition(latlng);
        } else {
          markerRef.current = new kakao.maps.Marker({
            position: latlng,
          });
          markerRef.current.setMap(mapRef.current);
        }
      }
    };
    ps.keywordSearch(searchAddress, placesSearchCB);
  };

  useEffect(() => {
    const { kakao } = window;
    if (kakao) {
      const mapOptions = {
        center: new kakao.maps.LatLng(35.084138, 128.873972),
        level: 8, // 초기 줌 레벨
      };

      mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);

      const markerPosition = new kakao.maps.LatLng(35.084138, 128.873972);
      markerRef.current = new kakao.maps.Marker({
        position: markerPosition,
      });

      markerRef.current.setMap(mapRef.current);
    }
  }, []);

  return (
    <div className="plant-sharing-board-write-container">
      <form className="plant-sharing-board-write-form" onSubmit={handleSubmit}>
        <h2 className="plant-sharing-board-write-page-title">식물 나눔</h2>
        <div className="form-group">
          <label className="plant-sharing-board-label">
            카테고리:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="plant-sharing-board-select"
            >
              <option value="공지">나눔</option>
              <option value="질문">나눔중</option>
              <option value="기타">나눔완료</option>
            </select>
          </label>
        </div>
        <label className="plant-sharing-board-label">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="plant-sharing-board-input"
            placeholder="제목을 입력하세요"
            required
          />
        </label>
        <label className="plant-sharing-board-label">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="plant-sharing-board-textarea"
            placeholder="내용을 입력하세요"
            required
          />
        </label>
        <div className="map-container">
          <div id="map" ref={mapContainer} style={{ width: '100%', height: '300px', marginBottom: '20px' }}></div>
        </div>
        <div className="plant-search-container">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="plant-search-input"
            placeholder="주소 또는 키워드 검색"
          />
          <button type="button" onClick={searchMap} className="plant-search-button">검색</button>
        </div>
        <label className="plant-sharing-board-label">
          첨부 파일:
          <input
            type="file"
            onChange={handleFileChange}
            className="plant-sharing-board-file-input"
          />
        </label>
        <button type="submit" className="plant-sharing-board-button">작성</button>
      </form>
    </div>
  );
};

export default PlantSharingBoardWrite;