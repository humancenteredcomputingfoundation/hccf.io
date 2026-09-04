import React, { useState } from 'react';
import '../index.css';
import nonprofitImg from '../assets/notprofit.jpg';
import rileyImg from '../assets/riley.jpg';
import lucasImg from '../assets/lucas.jpg';
import letter501Img from '../assets/501letter.png';

const AboutPage: React.FC = () => {
  // Accordion state: default open first item
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="about-page">
      {/* 1. HERO SECTION */}
      <section className="about-hero-section">
        <div className="section-container">
          <span className="about-tag">About Us</span>
          <h1 className="about-hero-title">
            Founded on the conviction <br />
            that technology must serve humanity first
          </h1>
          <p className="about-hero-text">
            A 501(c)(3) nonprofit built from day one around a principled alternative to extractive technology business models.
          </p>
        </div>
      </section>

      {/* 2. OUR STORY AND STRUCTURE */}
      <section className="story-section">
        <div className="section-container">
          <h2 className="story-main-title">Our Story And Structure</h2>
          <div className="story-content-grid">
            {/* Left Column: Image */}
            <div className="story-image-container">
              <img
                src={nonprofitImg}
                alt="#PEOPLE NOT PROFIT sign"
                className="story-image"
              />
            </div>

            {/* Right Column: Accordions */}
            <div className="story-accordion-list">
              {/* Accordion Item 1 */}
              <div className={`about-accordion-item ${openAccordion === 0 ? 'is-open' : ''}`}>
                <button
                  className="about-accordion-header"
                  onClick={() => toggleAccordion(0)}
                  aria-expanded={openAccordion === 0}
                >
                  <span>Why we started HCCF</span>
                  <span className="accordion-icon">
                    {openAccordion === 0 ? '▴' : '▾'}
                  </span>
                </button>
                {openAccordion === 0 && (
                  <div className="about-accordion-body">
                    <p>
                      The Human-Centered Computing Foundation was created to address a critical deficit in the modern technology landscape. The prevailing economic models of the digital age — surveillance capitalism and entrapping SaaS platforms — prioritize corporate shareholder value over the fundamental needs, privacy, and autonomy of the individual.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                      These models capture the value that users create and provide, and rather than redirecting it back to the user, they extract it solely for corporate benefit. HCCF exists to recalibrate this balance.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                      Our founders bring an international perspective — combining the experience of building technology in the United States with insights from Brazil and beyond — reflecting our conviction that a truly human-centered ecosystem must represent the full diversity of humanity.
                    </p>
                  </div>
                )}
              </div>

              {/* Accordion Item 2 */}
              <div className={`about-accordion-item ${openAccordion === 1 ? 'is-open' : ''}`}>
                <button
                  className="about-accordion-header"
                  onClick={() => toggleAccordion(1)}
                  aria-expanded={openAccordion === 1}
                >
                  <span>Built for mission, not margin</span>
                  <span className="accordion-icon">
                    {openAccordion === 1 ? '▴' : '▾'}
                  </span>
                </button>
                {openAccordion === 1 && (
                  <div className="about-accordion-body">
                    <p>
                      As a 501(c)(3) nonprofit, every decision we make is guided by mission rather than financial return. Our legal structure is a feature, not an afterthought — it signals that we cannot and will not compromise our principles for commercial convenience.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                      We are governed by a board of directors and operate as a fully remote organization, enabling us to draw on global talent and perspectives. Founders work without salary in this initial phase to direct maximum resources toward mission-critical activities.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR LEADERSHIP */}
      <section className="leadership-section">
        {/* Teal Header Banner */}
        <div className="leadership-header-band">
          <div className="section-container">
            <h2 className="leadership-main-title">Our Leadership</h2>
          </div>
        </div>

        {/* White Background Cards Area */}
        <div className="leadership-content-bg">
          <div className="section-container">
            <div className="leadership-grid">
              {/* Leader 1: Riley */}
              <div className="leader-card">
                <h3 className="leader-name">James Riley O'Donnell, CEO</h3>
                <div className="leader-image-wrapper">
                  <img src={rileyImg} alt="James Riley O'Donnell" className="leader-image" />
                </div>
                <p className="leader-bio">
                  Riley is an entrepreneur and computer engineer with over 15 years of experience operating in large-scale environments. He is passionate about technology and humanity and wants to see technology better serve human needs.
                </p>
                <a
                  href="https://www.linkedin.com/in/james-riley-odonnell/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                  aria-label="Riley O'Donnell LinkedIn"
                >
                  <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>

              {/* Leader 2: Lucas */}
              <div className="leader-card">
                <h3 className="leader-name">Lucas Silva, COO</h3>
                <div className="leader-image-wrapper">
                  <img src={lucasImg} alt="Lucas Silva" className="leader-image" />
                </div>
                <p className="leader-bio">
                  Lucas has a wealth of experience in developing digital products focused on people. He has led highly successful tech teams through consulting and mentoring, enabling individual contributors to succeed in their roles.
                </p>
                <a
                  href="https://www.linkedin.com/in/lucasfariafaria/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="linkedin-link"
                  aria-label="Lucas Silva LinkedIn"
                >
                  <svg className="linkedin-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 501(c)(3) DETERMINATION LETTER */}
      <section className="letter-section">
        <div className="letter-header-band">
          <h2 className="letter-title">Our 501(c)(3) Determination Letter</h2>
        </div>
        <div className="section-container letter-content-container">
          <div className="letter-wrapper">
            <img
              src={letter501Img}
              alt="IRS 501(c)(3) Determination Letter"
              className="irs-letter-image"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;