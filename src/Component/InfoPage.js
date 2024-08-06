import React, { useState, useEffect } from 'react';
import { XMLParser } from 'fast-xml-parser';

const InfoPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const apiKey = process.env.REACT_APP_API_KEY;
      const url = `/service/garden/gardenDtl?key=${apiKey}`;

      console.log('Fetching data from URL:', url);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const text = await response.text();
        console.log('Response Text:', text);

        // XML 응답을 JSON으로 변환
        const parser = new XMLParser();
        const result = parser.parse(text);
        console.log('Parsed JSON:', result);

        // 응답에서 필요한 데이터를 추출
        const resultData = result.response.header;
        setData(resultData);
      } catch (error) {
        console.error('Fetch error:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Garden Details</h1>
      {data && (
        <div>
          <h2>Result Code: {data.resultCode}</h2>
          <p>Result Message: {data.resultMsg}</p>
          <p>Request Key: {data.requestParameter.key}</p>
        </div>
      )}
    </div>
  );
};

export default InfoPage;