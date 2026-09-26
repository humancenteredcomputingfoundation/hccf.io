import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

// Lazy load route pages
const HomePage = lazy(() => import('./pages/HomePage'));
const MissionPage = lazy(() => import('./pages/MissionPage'));
const WhatWeBuildPage = lazy(() => import('./pages/WhatWeBuildPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GetInvolvedPage = lazy(() => import('./pages/GetInvolvedPage'));
const GtldJourneyPage = lazy(() => import('./pages/GtldJourneyPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Named exports require mapping the module default
const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
};

// Fallback loader displayed while page route chunks load
const PageLoader: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="blog-loading">Loading...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/what-we-build" element={<WhatWeBuildPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/get-involved" element={<GetInvolvedPage />} />
              <Route path="/gtld-journey" element={<GtldJourneyPage />} />
              
              <Route path="/:year/:month/:day/:slug" element={<BlogPostPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;