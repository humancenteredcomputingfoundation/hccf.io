import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

import gtldSubmissionImg from '../assets/gTLD_Marked_spaced.png';

const GtldJourneyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="gtld-page">
      {/* 1. HERO SECTION */}
      <section className="gtld-hero-section">
        <div className="section-container">
          <span className="gtld-tag">INFRASTRUCTURE INITIATIVE</span>
          <h1 className="gtld-hero-title">
            The Journey to <br />
            a Human-Centered <br />
            <span className="title-teal">Top-Level Domain</span>
          </h1>
          <p className="gtld-hero-text">
            Documenting the Human-Centered Computing Foundation's official application process through ICANN’s Applicant Support Program to establish <strong>.self</strong> as a safe, ethical domain namespace.
          </p>
        </div>
      </section>

      {/* 2. SUBMISSION STATUS HIGHLIGHT */}
      <section className="gtld-status-section">
        <div className="section-container">
          <div className="gtld-status-grid">
            <div className="gtld-status-card">
              <div className="gtld-status-header">
                <span className="status-badge">MILESTONE REACHED</span>
                <span className="status-date">12-Aug-2026</span>
              </div>
              <h2 className="gtld-card-title">gTLD Application Formally Submitted</h2>
              <p className="gtld-card-text">
                HCCF has submitted its application through ICANN's Applicant Support Program (ASP) for the <strong>.self</strong> generic Top-Level Domain (gTLD). This marks a crucial step forward in establishing dedicated, privacy-focused internet infrastructure operating for user benefit rather than corporate extraction.
              </p>
              <div className="gtld-actions">
                <a
                  href="https://www.linkedin.com/feed/update/urn:li:activity:7493457576991535105/?actorCompanyId=109999756"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtld-external-btn"
                >
                  View Announcement on LinkedIn &rarr;
                </a>
              </div>
            </div>

            <div className="gtld-image-container">
              <img
                src={gtldSubmissionImg}
                alt="ICANN Application Milestones showing Submitted status"
                className="gtld-milestone-img"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. ABOUT .SELF DOMAIN */}
      <section className="gtld-about-section">
        <div className="section-container">
          <h2 className="gtld-section-title">About the .self gTLD</h2>
          <div className="gtld-two-col">
            <div className="gtld-col-text">
              <p>
                The proposed <strong>.self</strong> generic top-level domain is designed as a secure home namespace tailored for human-centered computing devices and self-hosted environments operating at human scale.
              </p>
              <p>
                In today's digital landscape, personal data and user connections are routinely funneled through centralized platforms and exploited for ad revenue or data harvesting. The <strong>.self</strong> top-level domain aims to reverse this standard by prioritizing individual sovereignty, end-to-end user data ownership, and transparent network governance.
              </p>
            </div>
            <div className="gtld-col-text">
              <p>
                Key principles guiding the <strong>.self</strong> namespace include:
              </p>
              <ul className="gtld-feature-list">
                <li><strong>Built-in Anti-Abuse Rules:</strong> Strong governance mechanisms to prevent malicious exploitation and spam within the namespace.</li>
                <li><strong>Privacy by Default:</strong> Architectural protections against unauthorized tracking and surveillance.</li>
                <li><strong>Equitable Access:</strong> Structured under ICANN's ASP framework to ensure sustainable, non-extractive availability.</li>
              </ul>
              <div className="gtld-wiki-box">
                <span>Learn more about community efforts around the domain:</span>
                <a
                  href="https://icannwiki.org/.self"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gtld-inline-link"
                >
                  Read .self on ICANNWiki &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATION PROCESS STAGES */}
      <section className="gtld-timeline-section">
        <div className="section-container">
          <h2 className="gtld-section-title">ICANN Evaluation Stages</h2>
          <div className="gtld-timeline-grid">
            <div className="timeline-item completed">
              <div className="timeline-marker">&#10003;</div>
              <div className="timeline-content">
                <h3>1. Application Submission</h3>
                <p>Completed on August 12, 2026. Official documentation submitted via ICANN Applicant Support Program.</p>
              </div>
            </div>

            <div className="timeline-item current">
              <div className="timeline-marker">&bull;</div>
              <div className="timeline-content">
                <h3>2. Pre-Evaluation Processing</h3>
                <p>Underway. Verification of eligibility criteria, financial stability, and operational capabilities.</p>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-marker">&bull;</div>
              <div className="timeline-content">
                <h3>3. String Evaluation & Contention</h3>
                <p>Technical evaluation of requested gTLD string and resolution of potential conflicts.</p>
              </div>
            </div>

            <div className="timeline-item pending">
              <div className="timeline-marker">&bull;</div>
              <div className="timeline-content">
                <h3>4. Contracting & Delegation</h3>
                <p>Final registry agreements with ICANN and technical delegation into the DNS root zone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BACK NAVIGATION */}
      <section className="gtld-footer-nav">
        <div className="section-container">
          <button className="gtld-back-btn" onClick={() => navigate('/')}>
            &larr; Back to Homepage
          </button>
        </div>
      </section>
    </div>
  );
};

export default GtldJourneyPage;