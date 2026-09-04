import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import WhatWeBuildPage from './pages/WhatWeBuildPage';
import AboutPage from './pages/AboutPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import './index.css';

const BlogPage: React.FC = () => (
  <div className="section-container" style={{ padding: '5rem 2rem' }}>
    <h1 className="section-title">Blog</h1>
    <p className="section-text">Articles, announcements, and thoughts from our team.</p>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mission" element={<MissionPage />} />
            <Route path="/what-we-build" element={<WhatWeBuildPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/get-involved" element={<GetInvolvedPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;