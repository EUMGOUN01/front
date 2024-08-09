import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/PlantSharingBoardWrite.css'; 
import { FiSearch } from 'react-icons/fi';
import { GrPowerReset } from 'react-icons/gr';

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
  const infowindowRef = useRef(null); 
  const currentLocationMarkerRef = useRef(null); 
  const [currentLatLng, setCurrentLatLng] = useState(null);

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
      fileName: file ? file.name : null,
      location: markerRef.current ? markerRef.current.getPosition() : null,
    };
    console.log('New Post:', newPost);
    navigate('/plant-sharing');
  };

  const searchMap = useCallback(() => {
    const { kakao } = window;
    if (!kakao) return;

    const geocoder = new kakao.maps.services.Geocoder();

    if (searchAddress) {
      geocoder.addressSearch(searchAddress, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const latlng = new kakao.maps.LatLng(result[0].y, result[0].x);

          mapRef.current.setCenter(latlng);
          mapRef.current.setLevel(3);

          if (markerRef.current) markerRef.current.setMap(null);
          if (infowindowRef.current) infowindowRef.current.close();

          const newMarker = new kakao.maps.Marker({ position: latlng });
          newMarker.setMap(mapRef.current);
          markerRef.current = newMarker; 

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${result[0].address_name}</div>`,
          });
          infowindow.open(mapRef.current, newMarker);
          infowindowRef.current = infowindow; 
        } else {
          console.error('주소 검색 실패, 상태:', status);
        }
      });
    }
  }, [searchAddress]);

  const handleMapClick = useCallback((mouseEvent) => {
    const { kakao } = window;
    if (!kakao) return;

    const latlng = mouseEvent.latLng;

    if (markerRef.current) markerRef.current.setMap(null);
    if (infowindowRef.current) infowindowRef.current.close();

    const newMarker = new kakao.maps.Marker({ position: latlng });
    newMarker.setMap(mapRef.current);
    markerRef.current = newMarker; 

    const geocoder = new kakao.maps.services.Geocoder();
    geocoder.coord2Address(latlng.getLng(), latlng.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address.address_name;

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">주소: ${address}</div>`,
        });
        infowindow.open(mapRef.current, newMarker);
        infowindowRef.current = infowindow; 
      } else {
        console.error('주소 검색 실패, 상태:', status);
      }
    });
  }, []);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    const mapOptions = {
      center: new kakao.maps.LatLng(35.1587, 129.1601), 
      level: 8,
    };

    mapRef.current = new kakao.maps.Map(mapContainer.current, mapOptions);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const latlng = new kakao.maps.LatLng(latitude, longitude);
        setCurrentLatLng(latlng);

        mapRef.current.setCenter(latlng);
        mapRef.current.setLevel(5); 

        if (currentLocationMarkerRef.current) currentLocationMarkerRef.current.setMap(null);

        const imageSrc = '/path/to/current-location-marker.png'; 
        const imageSize = new kakao.maps.Size(32, 32);
        const imageOption = { offset: new kakao.maps.Point(16, 32) };
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const newMarker = new kakao.maps.Marker({
          position: latlng,
          image: markerImage,
          title: '현재 위치'
        });
        newMarker.setMap(mapRef.current);
        currentLocationMarkerRef.current = newMarker; 

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">현재 위치</div>`,
        });
        infowindow.open(mapRef.current, newMarker);

        infowindowRef.current = infowindow; 
      },
      (error) => {
        console.error('현재 위치를 가져오는 중 오류 발생:', error);
        mapRef.current.setCenter(new kakao.maps.LatLng(35.1587, 129.1601));
      }
    );

    kakao.maps.event.addListener(mapRef.current, 'click', handleMapClick);

    return () => {
      if (markerRef.current) markerRef.current.setMap(null);
      if (infowindowRef.current) infowindowRef.current.close();
      if (currentLocationMarkerRef.current) currentLocationMarkerRef.current.setMap(null);
      kakao.maps.event.removeListener(mapRef.current, 'click', handleMapClick);
    };
  }, [handleMapClick]);

  const handleSearchReset = () => {
    setSearchAddress('');

    if (markerRef.current) markerRef.current.setMap(null);
    if (infowindowRef.current) infowindowRef.current.close();

    if (currentLatLng) {
      mapRef.current.setCenter(currentLatLng);
      mapRef.current.setLevel(3); 
    }
  };

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
        <div className="search-container">
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="search-input"
            placeholder="주소를 입력하세요."
            style={{ width: '450px' }}
          />
          <button type="button" onClick={searchMap} className="search-button"><FiSearch /></button>
          <button type="button" onClick={handleSearchReset} className="reset-button"><GrPowerReset /></button>
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