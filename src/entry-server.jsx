// Build-time rendering only. The interactive application still mounts normally in the browser.
import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MissionPage from './pages/MissionPage';
import WhatWeBuildPage from './pages/WhatWeBuildPage';
import AboutPage from './pages/AboutPage';
import GetInvolvedPage from './pages/GetInvolvedPage';
import GtldJourneyPage from './pages/GtldJourneyPage';
import SelfPage from './pages/SelfPage';
import HumanCenteredGuidePage from './pages/HumanCenteredGuidePage';
import { BlogPage } from './pages/BlogPage';

const pages = {
  '/': HomePage,
  '/mission/': MissionPage,
  '/what-we-build/': WhatWeBuildPage,
  '/about/': AboutPage,
  '/blog/': BlogPage,
  '/get-involved/': GetInvolvedPage,
  '/self-gtld/': GtldJourneyPage,
  '/self/': SelfPage,
  '/human-centered-computing/': HumanCenteredGuidePage,
};
export function renderStaticPage(path) {
  const Page = pages[path];
  if (!Page) return null;
  return renderToString(
    <MemoryRouter initialEntries={[path]}>
      <div className="app-container"><Navbar /><main><Page /></main><Footer /></div>
    </MemoryRouter>
  );
}
