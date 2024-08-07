// InfoPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const InfoPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = process.env.REACT_APP_API_KEY; // .env 파일에서 API 키를 가져옵니다

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 요청 URL 및 파라미터 설정
        const response = await axios.get('/service/garden/gardenFileList', {
          params: {
            apiKey: apiKey,
            cntntsNo: 'exampleCntntsNo', // 여기에 유효한 cntntsNo 값을 넣어야 합니다
          },
          responseType: 'text', // XML 형식의 응답을 텍스트로 처리
        });

        // XML 파서를 설정합니다
        const parser = new XMLParser();
        const result = parser.parse(response.data);

        // XML 데이터를 콘솔에 출력하여 구조 확인
        console.log('XML 변환 결과:', result);

        // 응답 코드 및 메시지 확인
        const resultCode = result.response.header.resultCode;
        const resultMsg = result.response.header.resultMsg;

        if (resultCode === '0') {
          // 데이터가 정상인 경우
          const items = result.response.body.items && result.response.body.items.item ? result.response.body.items.item : [];
          if (Array.isArray(items)) {
            setData(items);
          } else {
            console.warn('No data items found');
            setData([]);
          }
        } else {
          console.error('API 오류:', resultMsg);
          setError(resultMsg);
        }
        setLoading(false);
      } catch (error) {
        console.error('API 요청 오류:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [apiKey]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>File List</h1>
      {data.length > 0 ? (
        data.map((item, index) => (
          <div key={index}>
            <h2>{item.cntntsSj}</h2>
            <p>File Number: {item.rtnFileSn}</p>
            <p>File Type Code: {item.rtnFileSeCode}</p>
            <p>File Type Name: {item.rtnFileSeCodeName}</p>
            <p>Image Type Code: {item.rtnImgSeCode}</p>
            <p>Image Type Name: {item.rtnImgSeCodeName}</p>
            <p>Original File Name: {item.rtnOrginlFileNm}</p>
            <p>Description: {item.rtnImageDc}</p>
            <p>File URL: <a href={item.rtnFileUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            <p>Thumbnail: <img src={item.rtnThumbFileUrl} alt={item.rtnImageDc} style={{ maxWidth: '200px', maxHeight: '200px' }} /></p>
          </div>
        ))
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default InfoPage;