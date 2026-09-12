import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

import heroImg1 from '../assets/hero1.jpg';
import heroImg2 from '../assets/hero2.jpg';
import heroImg3 from '../assets/hero3.jpg';
import heroImg4 from '../assets/hero4.jpg';
import gtldSubmissionImg from '../assets/gTLD_Marked_spaced.png';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);
  const navigate = useNavigate();

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 1 : 0));
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  return (
    <div className="homepage">
      {/* 1. HERO CAROUSEL SECTION */}
      <section className="hero-section">
        <button 
          className="hero-carousel-arrow hero-left-arrow" 
          onClick={handlePrevSlide} 
          aria-label="Previous Slide"
        >
          &#10094;
        </button>
        <button 
          className="hero-carousel-arrow hero-right-arrow" 
          onClick={handleNextSlide} 
          aria-label="Next Slide"
        >
          &#10095;
        </button>

        <div className="hero-carousel-viewport">
          <div 
            className="hero-carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* HERO CARD 1: Core Mission */}
            <div className="hero-slide">
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
                  <div className="static-images-grid">
                    <div className="static-card">
                      <img src={heroImg1} alt="Human centered tech 1" />
                    </div>
                    <div className="static-card">
                      <img src={heroImg2} alt="Human centered tech 2" />
                    </div>
                    <div className="static-card">
                      <img src={heroImg3} alt="Human centered tech 3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* HERO CARD 2: gTLD Submission Milestone */}
            <div className="hero-slide">
              <div className="hero-content-wrapper">
                <div className="hero-left">
                  <span className="hero-badge">MAJOR MILESTONE</span>
                  <h1 className="hero-title">
                    Our gTLD <br />
                    Application Is <br />
                    <span className="title-bold">Submitted</span>
                  </h1>
                  <p className="hero-subtext">
                    We have officially submitted our application for a new human-centered Top-Level Domain. Follow our milestone progress and full evaluation journey.
                  </p>
                  <button 
                    className="hero-cta-btn"
                    onClick={() => navigate('/gtld-journey')}
                  >
                    View Submission Journey &rarr;
                  </button>
                </div>

                <div className="hero-right hero-right-center">
                  <div className="gtld-image-frame">
                    <img src={gtldSubmissionImg} alt="gTLD Application Submitted Milestone" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="hero-carousel-dots">
          <button 
            className={`dot ${currentSlide === 0 ? 'active' : ''}`} 
            onClick={() => setCurrentSlide(0)}
            aria-label="Slide 1"
          />
          <button 
            className={`dot ${currentSlide === 1 ? 'active' : ''}`} 
            onClick={() => setCurrentSlide(1)}
            aria-label="Slide 2"
          />
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
              <div className={`accordion-body-wrapper ${openAccordion === 0 ? 'is-open' : ''}`}>
                <div className="accordion-body-inner">
                  <div className="accordion-body">
                    When a product is free to use, the data users generate is the real product being sold to others. Whether it's to sell targeted advertisements or to train AI models, personal information is harvested like a crop and productized without meaningful consent or benefit to the user generating that value.
                  </div>
                </div>
              </div>
            </div>

            <div className={`accordion-item ${openAccordion === 1 ? 'is-open' : ''}`}>
              <button className="accordion-header" onClick={() => toggleAccordion(1)}>
                <span>Entrapping Subscription Lock-In</span>
                <span className="accordion-icon">{openAccordion === 1 ? '—' : '+'}</span>
              </button>
              <div className={`accordion-body-wrapper ${openAccordion === 1 ? 'is-open' : ''}`}>
                <div className="accordion-body-inner">
                  <div className="accordion-body">
                    Proprietary walled-gardens prevent interoperability, trapping user data behind artificial barriers and forcing ongoing financial subscription fees without true data ownership.
                  </div>
                </div>
              </div>
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