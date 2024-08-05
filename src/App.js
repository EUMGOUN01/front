import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Component/Header';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SignupPage';
import BoardPage from './Component/BoardPage';
import WritePostPage from './Component/WritePostPage'; 
import Homepage from './Component/Homepage'; 

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
      </Routes>
    </Router>
  );
}

export default App;