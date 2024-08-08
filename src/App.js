import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SignupPage';
import BoardPage from './Component/BoardPage'; 
import PlantSharingBoard from './Component/PlantSharingBoard'; 
import WritePostPage from './Component/WritePostPage'; 
import PlantSharingBoardWrite from './Component/PlantSharingBoardWrite'; 
import Homepage from './Component/Homepage';
import InfoPage from './Component/InfoPage';
import CommunityGardenPage from './Component/CommunityGardenPage';
import PlantDetail from './Component/PlantDetails'; 
import PostDetail from './Component/PostDetail'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} /> 
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardPage />} /> 
        <Route path="/plant-sharing" element={<PlantSharingBoard />} /> 
        <Route path="/write" element={<WritePostPage />} /> 
        <Route path="/plant-sharing/write" element={<PlantSharingBoardWrite />} /> 
        <Route path="/info" element={<InfoPage />} />
        <Route path="/community-garden" element={<CommunityGardenPage />} />
        <Route path="/plant-sharing/:id" element={<PlantDetail />} /> 
        <Route path="/post/:id" element={<PostDetail />} /> {/* Add route for PostDetail */}
      </Routes>
    </Router>
  );
}

export default App;