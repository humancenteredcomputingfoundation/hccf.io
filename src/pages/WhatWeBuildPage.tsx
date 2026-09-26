import React from 'react';
import '../index.css';
import letterImg from '../assets/letter.png';
import { Link, useNavigate } from 'react-router-dom';

const WhatWeBuildPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="what-we-build-page">
      {/* 1. HERO SECTION */}
      <section className="build-hero-section">
        <div className="section-container">
          <span className="build-tag">What We Build</span>
          <h1 className="build-hero-title">
            A self-reinforcing <br />
            ecosystem for ethical technology
          </h1>
          <p className="build-hero-text">
            Each of our four initiatives reinforces the others; creating infrastructure, defining standards, recognizing compliance, and directing resources toward the social sector.
          </p>
        </div>
      </section>

      {/* 2. INITIATIVE 01 SECTION */}
      <section className="initiative-section">
        <div className="initiative-container">
          {/* Left Column: Dark Teal Background */}
          <div className="initiative-left">
            <span className="initiative-tag">INITIATIVE 01: IN PROGRESS</span>
            <h2 className="initiative-title">
              A New Generic <br />
              Top-Level Domain <br />
              (gTLD)
            </h2>
            <p className="initiative-description">
              The cornerstone of our efforts is a new generic Top-Level Domain, a digital namespace dedicated exclusively to human-centered technologies. Unlike conventional gTLDs, ours is architected around intentional constraints that foster a healthier online environment. Enforcing equitable rules such as one-domain-per-account prevents speculation and abuse, preserving the namespace as a public good that empowers individual identity and autonomy online.
            </p>
          </div>

          {/* Right Column: Cream Container for Status & Letter */}
          <div className="initiative-right">
            <div className="status-card">
              <h3 className="status-title">Current Status</h3>
              <p className="status-text">
                We are one of the 56 approved organizations for ICANN's Applicant Support Program (ASP) in April 2026. Our application for .self in the gTLD 2026 round was submitted on 12 August 2026. We are now waiting for the review day expected for October 2026.{' '}
                <Link to="/gtld-journey" className="status-link">Click here to learn more about our gTLD application journey.</Link>
              </p>
              <p className="status-text">See below our ASP approval letter.</p>
              <div className="letter-container">
                <img
                  src={letterImg}
                  alt="ICANN Application Support Program Approval Letter"
                  className="letter-image"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="page-cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2 className="cta-title">Follow Our ICANN Evaluation Progress</h2>
            <p className="cta-description">
              Track key milestones, read our submitted applications, and stay informed on our roadmap toward launching a human-first TLD infrastructure.
            </p>
            <button className="cta-btn" onClick={() => navigate('/gtld-journey')}>
              Explore Our gTLD Journey &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeBuildPage;