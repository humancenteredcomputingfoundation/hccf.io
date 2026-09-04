import React, { useState } from 'react';
import '../index.css';

import heroImg1 from '../assets/hero1.jpg';
import heroImg2 from '../assets/hero2.jpg';
import heroImg3 from '../assets/hero3.jpg';
import heroImg4 from '../assets/hero4.jpg'; // Imported hero4 asset

const baseImages = [heroImg1, heroImg2, heroImg3];

const HomePage: React.FC = () => {
  // Conveyor window: 5 active cards
  const [belt, setBelt] = useState<string[]>([
    baseImages[0],
    baseImages[1],
    baseImages[2],
    baseImages[0],
    baseImages[1],
  ]);

  // Animation direction state: 'next' | 'prev' | null
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Card width (260px) + Gap (24px) = 284px step size
  const STEP_SIZE = 284;

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('next');
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('prev');
  };

  const handleTransitionEnd = () => {
    if (!direction) return;

    if (direction === 'next') {
      setBelt((prevBelt) => {
        const lastImage = prevBelt[prevBelt.length - 1];
        const lastIndex = baseImages.indexOf(lastImage);
        const nextImage = baseImages[(lastIndex + 1) % baseImages.length];
        return [...prevBelt.slice(1), nextImage];
      });
    } else if (direction === 'prev') {
      setBelt((prevBelt) => {
        const firstImage = prevBelt[0];
        const firstIndex = baseImages.indexOf(firstImage);
        const prevImage = baseImages[(firstIndex - 1 + baseImages.length) % baseImages.length];
        return [prevImage, ...prevBelt.slice(0, prevBelt.length - 1)];
      });
    }

    // Reset slide offset instantly without animation after updating state
    setDirection(null);
    setIsAnimating(false);
  };

  // Determine current translation value based on slide direction
  const getTransformOffset = () => {
    if (direction === 'next') return `-${STEP_SIZE}px`;
    if (direction === 'prev') return `${STEP_SIZE}px`;
    return '0px';
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="homepage">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-left">
            <h1 className="hero-title">
              Technology <br />
              That Serves <br />
              <span className="title-bold">Humanity</span>
            </h1>
            <p className="hero-subtext">
              The Human-Centered Computing Foundation builds the infrastructure, standards, and ecosystem needed to make ethical technology the default, not the exception.
            </p>
          </div>

          <div className="hero-right">
            <button className="carousel-arrow left-arrow" onClick={handlePrev} aria-label="Previous">
              &#10094;
            </button>
            <button className="carousel-arrow right-arrow" onClick={handleNext} aria-label="Next">
              &#10095;
            </button>

            <div className="carousel-viewport">
              <div
                className={`carousel-track ${isAnimating ? 'is-sliding' : ''}`}
                onTransitionEnd={handleTransitionEnd}
                style={{
                  transform: `translateX(${getTransformOffset()})`
                }}
              >
                {belt.map((imgSrc, idx) => (
                  <div key={`${imgSrc}-${idx}`} className="carousel-card">
                    <img src={imgSrc} alt={`Conveyor item ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-container">
          <span className="section-tag">THE PROBLEM</span>
          <h2 className="problem-main-title">
            The Internet's ability to connect humans has been exploited for profit
          </h2>
          <p className="problem-description">
            The prevailing digital economy extracts value from individuals rather than returning it to them. Data is harvested, attention is monetized, and software is architected to create dependency, not empower users.
          </p>

          <div className="accordion-list">
            <div className={`accordion-item ${openAccordion === 0 ? 'is-open' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(0)}>
                <span>Exploitative Business Models</span>
                <span className="accordion-icon">{openAccordion === 0 ? '—' : '+'}</span>
              </button>
              {openAccordion === 0 && (
                <div className="accordion-body">
                  When a product is free to use, the data users generate is the real product being sold to others. Whether it's to sell targeted advertisements or to train AI models, personal information is harvested like a crop and productized without meaningful consent or benefit to the user generating that value.
                </div>
              )}
            </div>

            <div className={`accordion-item ${openAccordion === 1 ? 'is-open' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                <span>Entrapping Subscription Lock-In</span>
                <span className="accordion-icon">{openAccordion === 1 ? '—' : '+'}</span>
              </button>
              {openAccordion === 1 && (
                <div className="accordion-body">
                  Proprietary walled-gardens prevent interoperability, trapping user data behind artificial barriers and forcing ongoing financial subscription fees without true data ownership.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR RESPONSE SECTION */}
      <section className="response-section">
        <div className="response-left">
          <span className="section-tag-light">OUR RESPONSE</span>
          <h2 className="response-title">
            An integrated ecosystem for human-centered technology
          </h2>
          <p className="response-subtext">
            HCCF pursues its mission through four reinforcing initiatives: infrastructure, standards, certification, and community support.
          </p>
        </div>

        <div 
          className="response-right"
          style={{ backgroundImage: `url(${heroImg4})` }}
        >
          <div className="response-card-overlay">
            <div className="card-badge-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#007a8c">
                <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
              </svg>
            </div>
            <span className="card-category">INFRASTRUCTURE</span>
            <p className="card-text">
              As an approved participant in ICANN's Applicant Support Program (ASP), we are applying for a new generic Top-Level Domain (gTLD) designed around human-centered principles. This namespace will serve as a secure home for human-centered technologies, governed by built-in anti-abuse protections and equitable access rules.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;