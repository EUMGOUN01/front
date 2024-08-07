import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser'; // XML을 JSON으로 변환하기 위한 패키지
const InfoPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY; // 환경 변수에서 API 키 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/service/cropEbook/ebookList', {
          params: {
            apiKey: apiKey,
          },
          headers: {
            'Accept': 'application/xml', // XML 응답을 받기 위한 헤더
          },
        });
        // XML을 JSON으로 변환
        const parser = new XMLParser();
        const result = parser.parse(response.data);
        
        // JSON 형태로 변환된 데이터 구조 확인
        console.log('JSON 응답:', result);
        // 데이터 접근 경로를 실제 구조에 맞게 조정
        const items = result?.response?.body?.items?.item || [];
        setData(items);
        setLoading(false);
      } catch (error) {
        console.error('API 호출 오류:', error); // 오류 로깅
        setError(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [apiKey]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>농업기술길잡이 목록</h1>
      <ul>
        {data.length > 0 ? (
          data.map((item) => (
            <li key={item.ebookCode}>
              <img src={item.ebookImg} alt={item.atchmnflGroupEsntlEbookNm} />
              <h2>{item.ebookName}</h2>
              <p>{item.stdItemNm}</p>
              <a href={item.cropsEbookFile}>Download</a>
            </li>
          ))
        ) : (
          <p>No data available</p>
        )}
      </ul>
    </div>
  );
};
export default InfoPage;  