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
  const [region, setRegion] = useState('');
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

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; 
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const searchMap = useCallback(() => {
    const { kakao } = window;
    if (!kakao) return;

    const ps = new kakao.maps.services.Places();
    const radius = 10; // 10km

    if (searchAddress && region) {
      const address = `${region} ${searchAddress}`;
      ps.keywordSearch(address, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const newSearch = data[0];
          const latlng = new kakao.maps.LatLng(newSearch.y, newSearch.x);

          mapRef.current.setCenter(latlng);
          mapRef.current.setLevel(3);

          if (markerRef.current) markerRef.current.setMap(null);
          if (infowindowRef.current) infowindowRef.current.close();

          const newMarker = new kakao.maps.Marker({ position: latlng });
          newMarker.setMap(mapRef.current);
          markerRef.current = newMarker; 

          const infowindow = new kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${newSearch.place_name}</div>`,
          });
          infowindow.open(mapRef.current, newMarker);
          infowindowRef.current = infowindow; 
        } else {
          console.error('Map search failed with status:', status);
        }
      });
    } else if (searchAddress && currentLatLng) {
      ps.keywordSearch(searchAddress, (data, status) => {
        if (status === kakao.maps.services.Status.OK) {
          const filteredData = data.filter(place => {
            const placeLatLng = new kakao.maps.LatLng(place.y, place.x);
            const distance = calculateDistance(
              currentLatLng.getLat(),
              currentLatLng.getLng(),
              placeLatLng.getLat(),
              placeLatLng.getLng()
            );
            return distance <= radius; 
          });

          if (filteredData.length > 0) {
            const newSearch = filteredData[0];
            const latlng = new kakao.maps.LatLng(newSearch.y, newSearch.x);

            mapRef.current.setCenter(latlng);
            mapRef.current.setLevel(3);

            if (markerRef.current) markerRef.current.setMap(null);
            if (infowindowRef.current) infowindowRef.current.close();

            const newMarker = new kakao.maps.Marker({ position: latlng });
            newMarker.setMap(mapRef.current);
            markerRef.current = newMarker; 

            const infowindow = new kakao.maps.InfoWindow({
              content: `<div style="padding:5px;">${newSearch.place_name}</div>`,
            });
            infowindow.open(mapRef.current, newMarker);
            infowindowRef.current = infowindow; 
          } else {
            console.warn('No places found within 5km radius.');
          }
        } else {
          console.error('Map search failed with status:', status);
        }
      });
    }
  }, [searchAddress, region, currentLatLng]);

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
    geocoder.coord2RegionCode(latlng.getLng(), latlng.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const address = result[0].address_name;

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">${address}</div>`,
        });
        infowindow.open(mapRef.current, newMarker);
        infowindowRef.current = infowindow; 
      } else {
        console.error('Geocoding failed with status:', status);
      }
    });
  }, []);

  useEffect(() => {
    const { kakao } = window;
    if (!kakao) {
      console.error('Kakao Maps API not loaded.');
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

        const newMarker = new kakao.maps.Marker({ position: latlng, title: '현재 위치' });
        newMarker.setMap(mapRef.current);
        currentLocationMarkerRef.current = newMarker; 

        const infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding:5px;">현재 위치</div>`,
        });
        infowindow.open(mapRef.current, newMarker);

        infowindowRef.current = infowindow; 
      },
      (error) => {
        console.error('Error getting current position:', error);
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
    setRegion('');

    if (markerRef.current) markerRef.current.setMap(null);
    if (infowindowRef.current) infowindowRef.current.close();

    if (currentLatLng) {
      mapRef.current.setCenter(currentLatLng);
      mapRef.current.setLevel(5); 
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
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="search-input"
            placeholder="지역"
            style={{ width: '150px' }}
          />
          <input
            type="text"
            value={searchAddress}
            onChange={(e) => setSearchAddress(e.target.value)}
            className="search-input"
            placeholder="주소 또는 키워드 검색"
            style={{ width: '300px' }}
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