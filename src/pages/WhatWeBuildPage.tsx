import React from 'react';
import '../index.css';
import letterImg from '../assets/letter.png';

const WhatWeBuildPage: React.FC = () => {
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
            Each of our four initiatives reinforces the others creating infrastructure, defining standards, recognizing compliance, and directing resources toward the social sector.
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
              The cornerstone of our efforts is a new generic Top-Level Domain, a digital namespace dedicated exclusively to human-centered technologies. Unlike conventional gTLDs, ours is architected around intentional constraints that foster a healthier online environment.
            </p>
          </div>

          {/* Right Column: Cream Container for Status & Letter */}
          <div className="initiative-right">
            <div className="status-card">
              <h3 className="status-title">Current Status</h3>
              <p className="status-text">
                We are one of a few organizations that are fully qualified for ICANN's Application Support Program (ASP) and are in process of submitting our application for the gTLD.
              </p>

              {/* ICANN Letter Image Container */}
              <div className="letter-container">
                <img
                  src={letterImg}
                  alt="ICANN Application Support Program Approval Letter"
                  className="letter-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatWeBuildPage;