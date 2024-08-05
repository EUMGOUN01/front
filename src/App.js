import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SignupPage';
import BoardPage from './Component/BoardPage';
import WritePostPage from './Component/WritePostPage'; 
import Homepage from './Component/Homepage'; // 새로운 파일 이름으로 임포트

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* 새로운 컴포넌트를 기본 경로로 설정 */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/write" element={<WritePostPage />} />
      </Routes>
    </Router>
  );
}

export default App;