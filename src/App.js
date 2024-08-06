import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SignupPage';
import BoardPage from './Component/BoardPage';
import WritePostPage from './Component/WritePostPage';
import Homepage from './Component/Homepage';
import InfoPage from './Component/InfoPage';
import CommunityGardenPage from './Component/CommunityGardenPage'; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/write" element={<WritePostPage />} />
        <Route path="/info" element={<InfoPage />} />
        <Route path="/community-garden" element={<CommunityGardenPage />} /> {/* Add this route */}
      </Routes>
    </Router>
  );
}

export default App;