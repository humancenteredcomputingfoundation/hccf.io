import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

ReactGA.initialize('G-4E9K5WNZKG');

const HomePage = lazy(() => import('./pages/HomePage'));
const MissionPage = lazy(() => import('./pages/MissionPage'));
const WhatWeBuildPage = lazy(() => import('./pages/WhatWeBuildPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const GetInvolvedPage = lazy(() => import('./pages/GetInvolvedPage'));
const GtldJourneyPage = lazy(() => import('./pages/GtldJourneyPage'));
const SelfPage = lazy(() => import('./pages/SelfPage'));
const HumanCenteredGuidePage = lazy(() => import('./pages/HumanCenteredGuidePage'));
const NotFound = lazy(() => import('./pages/NotFound'));

const BlogPage = lazy(() => import('./pages/BlogPage').then(module => ({ default: module.BlogPage })));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage').then(module => ({ default: module.BlogPostPage })));

const PageTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const pageTitles: Record<string, string> = {
      '/': 'Human-Centered Computing Foundation | HCCF',
      '/mission/': 'Our Mission: Human-Centered Computing | HCCF',
      '/what-we-build/': 'Human-Centered Infrastructure and Initiatives | HCCF',
      '/self/': '.self: A Proposed TLD for Self-Hosting | HCCF',
      '/self-gtld/': '.self TLD Status and Application Journey | HCCF',
      '/get-involved/': 'Partner With or Support HCCF',
      '/about/': 'About HCCF | HCCF',
      '/human-centered-computing/': 'What Is Human-Centered Computing? | HCCF',
      '/blog/': 'Blog & News | HCCF',
    };
    const normalizedPath = location.pathname === '/' ? '/' : `${location.pathname.replace(/\/$/, '')}/`;
    const title = pageTitles[normalizedPath];
    if (title) document.title = title;
  }, [location.pathname]);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname + location.search,
    });
  }, [location]);

  return null;
};

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

const PageLoader: React.FC = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div className="blog-loading">Loading...</div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <PageTracker />
      <ScrollToTop />
      <div className="app-container">
        <Navbar />
        <main>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              
              <Route path="/mission" element={<MissionPage />} />
              <Route path="/mission/" element={<MissionPage />} />

              <Route path="/what-we-build" element={<WhatWeBuildPage />} />
              <Route path="/what-we-build/" element={<WhatWeBuildPage />} />

              <Route path="/about" element={<AboutPage />} />
              <Route path="/about/" element={<AboutPage />} />

              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/" element={<BlogPage />} />

              <Route path="/get-involved" element={<GetInvolvedPage />} />
              <Route path="/get-involved/" element={<GetInvolvedPage />} />

              <Route path="/self" element={<SelfPage />} />
              <Route path="/self/" element={<SelfPage />} />
              <Route path="/human-centered-computing" element={<HumanCenteredGuidePage />} />
              <Route path="/human-centered-computing/" element={<HumanCenteredGuidePage />} />
              <Route path="/about-us" element={<AboutPage />} />
              <Route path="/about-us/" element={<AboutPage />} />
              <Route path="/gtld-journey" element={<Navigate to="/self-gtld/" replace />} />
              <Route path="/gtld-journey/" element={<Navigate to="/self-gtld/" replace />} />
              <Route path="/self-gtld" element={<GtldJourneyPage />} />
              <Route path="/self-gtld/" element={<GtldJourneyPage />} />
              
              <Route path="/:year/:month/:day/:slug" element={<BlogPostPage />} />
              <Route path="/:year/:month/:day/:slug/" element={<BlogPostPage />} />

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