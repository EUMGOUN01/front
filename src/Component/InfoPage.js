import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { XMLParser } from 'fast-xml-parser';

const InfoPage = ({ cntntsNo }) => {
  const [gardenDtl, setGardenDtl] = useState(null);
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = process.env.REACT_APP_API_KEY;

        // API 요청
        const gardenDtlResponse = await axios.get('/service/garden/gardenDtl', {
          params: { apiKey, cntntsNo }
        });

        const gardenFileListResponse = await axios.get('/service/garden/gardenFileList', {
          params: { apiKey, cntntsNo }
        });

        console.log('Garden Detail Response:', gardenDtlResponse.data);
        console.log('Garden File List Response:', gardenFileListResponse.data);

        // XML 파서 설정
        const parser = new XMLParser({
          ignoreAttributes: false,
          attributeNamePrefix: '',
          textNodeName: 'text',
          removeNSPrefix: true,
          parseTagValue: true
        });

        // XML 파싱
        const gardenDtlData = parser.parse(gardenDtlResponse.data);
        const gardenFileListData = parser.parse(gardenFileListResponse.data);

        console.log('Parsed Garden Detail Data:', JSON.stringify(gardenDtlData, null, 2));
        console.log('Parsed Garden File List Data:', JSON.stringify(gardenFileListData, null, 2));

        // 데이터 추출
        const gardenDetailItem = gardenDtlData?.response?.body?.item || {};
        const gardenFileListItems = gardenFileListData?.response?.body?.items || [];

        // 상태 업데이트
        setGardenDtl(Object.keys(gardenDetailItem).length ? gardenDetailItem : null);
        setFileList(Array.isArray(gardenFileListItems) ? gardenFileListItems : []);
      } catch (err) {
        console.error('Fetch Error:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cntntsNo]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {gardenDtl ? (
        <div>
          <h1>{gardenDtl.plntbneNm || 'No Name Available'}</h1>
          <p><strong>영명:</strong> {gardenDtl.plntzrNm || 'No Data Available'}</p>
          <p><strong>유통명:</strong> {gardenDtl.distbNm || 'No Data Available'}</p>
          <p><strong>과명:</strong> {gardenDtl.fmlNm || 'No Data Available'}</p>
          <p><strong>원산지 정보:</strong> {gardenDtl.orgplceInfo || 'No Data Available'}</p>
          <p><strong>조언 정보:</strong> {gardenDtl.adviseInfo || 'No Data Available'}</p>
          <p><strong>성장 높이 정보:</strong> {gardenDtl.growthHgInfo || 'No Data Available'}</p>
          <p><strong>성장 넓이 정보:</strong> {gardenDtl.growthAraInfo || 'No Data Available'}</p>
          <p><strong>잎 형태 정보:</strong> {gardenDtl.lefStleInfo || 'No Data Available'}</p>

          {fileList.length > 0 ? (
            <div>
              <h2>첨부파일 목록</h2>
              <ul>
                {fileList.map((file, index) => (
                  <li key={index}>
                    <img src={file.rtnThumbFileUrl || ''} alt={file.rtnImageDc || 'No Description'} />
                    <p>{file.rtnFileSeCodeName || 'No Code Name'}: <a href={file.rtnFileUrl || '#'} target="_blank" rel="noopener noreferrer">{file.rtnOrginlFileNm || 'No File Name'}</a></p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No files available</p>
          )}
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default InfoPage;