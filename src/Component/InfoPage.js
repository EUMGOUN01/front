import React, { useEffect, useState } from 'react';
import { XMLParser } from 'fast-xml-parser';

const InfoPage = () => {
  const [gardenList, setGardenList] = useState([]);
  const [plantDetail, setPlantDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetchGardenList = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/service/garden/gardenList?apiKey=${apiKey}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        
        // XML 데이터 콘솔에 출력
        console.log("XML Data:", data);

        // XML을 JSON으로 변환
        const parser = new XMLParser();
        const json = parser.parse(data);

        // JSON 데이터 구조를 콘솔에 출력
        console.log("Parsed JSON:", json);

        // 데이터 경로 확인 후 items 추출
        const items = json.response.body.items.item || [];
        setGardenList(items);
      } catch (error) {
        console.error('Error fetching garden list:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGardenList();
  }, [apiKey]);

  useEffect(() => {
    if (selectedPlant) {
      const fetchPlantDetail = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch(`/service/garden/gardenDtl?apiKey=${apiKey}&cntntsNo=${selectedPlant}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.text();
          const parser = new XMLParser();
          const json = parser.parse(data);
          setPlantDetail(json.response.body.item);
        } catch (error) {
          console.error('Error fetching plant detail:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchPlantDetail();
    }
  }, [selectedPlant, apiKey]);

  const handlePlantClick = (cntntsNo) => {
    setSelectedPlant(cntntsNo);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Garden List</h1>
      {gardenList && gardenList.length > 0 ? (
        <ul>
          {gardenList.map((garden) => (
            <li key={garden.cntntsNo} onClick={() => handlePlantClick(garden.cntntsNo)}>
              <p><strong>Content Number:</strong> {garden.cntntsNo}</p>
              <p><strong>Garden Name:</strong> {garden.cntntsSj}</p>
              <p><strong>Description:</strong> {garden.rtnImageDc}</p>
              <p><strong>File Name:</strong> {garden.rtnOrginlFileNm}</p>
              <p><strong>File URL:</strong> <a href={garden.rtnFileUrl} target="_blank" rel="noopener noreferrer">Download</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No gardens available.</p>
      )}

      {plantDetail && (
        <div>
          <h1>Plant Detail</h1>
          <p><strong>Content Number:</strong> {plantDetail.cntntsNo}</p>
          <p><strong>Latin Name:</strong> {plantDetail.plntbneNm}</p>
          <p><strong>English Name:</strong> {plantDetail.plntzrNm}</p>
          <p><strong>Distribution Name:</strong> {plantDetail.distbNm}</p>
          <p><strong>Family Name:</strong> {plantDetail.fmlNm}</p>
          <p><strong>Origin Info:</strong> {plantDetail.orgplceInfo}</p>
          <p><strong>Advice Info:</strong> {plantDetail.adviseInfo}</p>
          <p><strong>Growth Height:</strong> {plantDetail.growthHgInfo}</p>
          <p><strong>Growth Width:</strong> {plantDetail.growthAraInfo}</p>
          <p><strong>Leaf Style Info:</strong> {plantDetail.lefStleInfo}</p>
          <p><strong>Smell Code Name:</strong> {plantDetail.smellCodeNm}</p>
          <p><strong>Toxicity Info:</strong> {plantDetail.toxctyInfo}</p>
          <p><strong>Propagation Era Info:</strong> {plantDetail.prpgtEraInfo}</p>
          <p><strong>Other Era Info:</strong> {plantDetail.etcEraInfo}</p>
          <p><strong>Management Level Code:</strong> {plantDetail.managelevelCodeNm}</p>
          <p><strong>Growth Rate Code:</strong> {plantDetail.grwtveCodeNm}</p>
          <p><strong>Growth Temperature Code:</strong> {plantDetail.grwhTpCodeNm}</p>
          <p><strong>Winter Lowest Temperature Code:</strong> {plantDetail.winterLwetTpCodeNm}</p>
          <p><strong>Humidity Code Name:</strong> {plantDetail.hdCodeNm}</p>
          <p><strong>Fertilizer Info:</strong> {plantDetail.frtlzInfo}</p>
          <p><strong>Soil Info:</strong> {plantDetail.soilInfo}</p>
          <p><strong>Water Cycle Spring Code:</strong> {plantDetail.watercycleSprngCodeNm}</p>
          <p><strong>Water Cycle Summer Code:</strong> {plantDetail.watercycleSummerCodeNm}</p>
          <p><strong>Water Cycle Autumn Code:</strong> {plantDetail.watercycleAutumnCodeNm}</p>
          <p><strong>Water Cycle Winter Code:</strong> {plantDetail.watercycleWinterCodeNm}</p>
          <p><strong>Pest Management Info:</strong> {plantDetail.dlthtsManageInfo}</p>
          <p><strong>Special Management Info:</strong> {plantDetail.speclmanageInfo}</p>
        </div>
      )}
    </div>
  );
};

export default InfoPage;