import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../index.css";

import heroImg1 from "../assets/hero1.jpg";
import heroImg2 from "../assets/hero2.jpg";
import heroImg3 from "../assets/hero3.jpg";
import heroImg4 from "../assets/hero4.jpg";
import gtldSubmissionImg from "../assets/gTLD_Marked_spaced.png";
import PamphletImg from "../assets/Pamphlet.png";

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  // Touch swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const navigate = useNavigate();

  const totalSlides = 3;

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(null); // Reset previous touch end position
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextSlide();
    } else if (isRightSwipe) {
      handlePrevSlide();
    }
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

        <div
          className="hero-carousel-viewport"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="hero-carousel-track"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {/* HERO CARD 0: Reclaiming Our Digital Selves */}
            <div className="hero-slide">
              <div className="hero-content-wrapper">
                <div className="hero-left">
                  <span className="hero-badge">VISION & INSIGHTS</span>
                  <h1 className="hero-title">
                    Reclaiming Our <br />
                    <span className="title-bold">Digital Selves</span>
                  </h1>
                  <p className="hero-subtext">
                    Explore HCCF's vision for a human-centered Top-Level Domain
                    designed to return identity control, digital autonomy, and
                    agency back to individuals.
                  </p>

                  {/* Hero Actions Container */}
                  <div className="hero-actions">
                    <button
                      className="hero-cta-btn"
                      onClick={() =>
                        navigate(
                          "/2026/06/21/reclaiming-our-digital-selves-hccfs-vision-for-a-human-centered-top-level-domain/"
                        )
                      }
                    >
                      Learn More &rarr;
                    </button>

                    <a
                      href="/dot-self.pdf"
                      download="dot-self.pdf"
                      className="hero-secondary-btn"
                    >
                      Download Pamphlet &darr;
                    </a>
                  </div>
                </div>

                <div className="hero-right hero-right-center">
                  <div className="gtld-image-frame">
                    <img 
                      src={PamphletImg} 
                      alt=".self Pamphlet" 
                      loading="lazy" 
                      decoding="async" 
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HERO CARD 1: gTLD Submission Milestone */}
            <div className="hero-slide">
              <div className="hero-content-wrapper">
                <div className="hero-left">
                  <span className="hero-badge">MAJOR MILESTONE</span>
                  <h1 className="hero-title">
                    Our gTLD <br />
                    Application is <br />
                    <span className="title-bold">Submitted</span>
                  </h1>
                  <p className="hero-subtext">
                    We have officially submitted our application for a new
                    human-centered Top-Level Domain. Follow our milestone
                    progress and full evaluation journey.
                  </p>
                  <button
                    className="hero-cta-btn"
                    onClick={() => navigate("/gtld-journey")}
                  >
                    View Submission Journey &rarr;
                  </button>
                </div>

                <div className="hero-right hero-right-center">
                  <div className="gtld-image-frame">
                    <img
                      src={gtldSubmissionImg}
                      alt="gTLD Application Submitted Milestone"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HERO CARD 2: Core Mission */}
            <div className="hero-slide">
              <div className="hero-content-wrapper">
                <div className="hero-left">
                  <h1 className="hero-title">
                    Technology <br />
                    That Serves <br />
                    <span className="title-bold">Humanity</span>
                  </h1>
                  <p className="hero-subtext">
                    The Human-Centered Computing Foundation builds the
                    infrastructure, standards, and ecosystem needed to make
                    ethical technology the default, not the exception.
                  </p>
                </div>

                <div className="hero-right">
                  <div className="static-images-grid">
                    <div className="static-card">
                      <img 
                        src={heroImg1} 
                        alt="Human centered tech 1" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>
                    <div className="static-card">
                      <img 
                        src={heroImg2} 
                        alt="Human centered tech 2" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>
                    <div className="static-card">
                      <img 
                        src={heroImg3} 
                        alt="Human centered tech 3" 
                        loading="lazy" 
                        decoding="async" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CAROUSEL NAVIGATION DOTS */}
          <div className="hero-carousel-dots">
            <button
              className={`dot ${currentSlide === 0 ? "active" : ""}`}
              onClick={() => setCurrentSlide(0)}
              aria-label="Slide 1"
            />
            <button
              className={`dot ${currentSlide === 1 ? "active" : ""}`}
              onClick={() => setCurrentSlide(1)}
              aria-label="Slide 2"
            />
            <button
              className={`dot ${currentSlide === 2 ? "active" : ""}`}
              onClick={() => setCurrentSlide(2)}
              aria-label="Slide 3"
            />
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="problem-section">
        <div className="section-container">
          <span className="section-tag">THE PROBLEM</span>
          <h2 className="problem-main-title">
            The Internet's ability to connect humans has been exploited for
            profit
          </h2>
          <p className="problem-description">
            The prevailing digital economy extracts value from individuals
            rather than returning it to them. Data is harvested, attention is
            monetized, and software is architected to create dependency, not
            empower users.
          </p>

          <div className="accordion-list">
            <div
              className={`accordion-item ${
                openAccordion === 0 ? "is-open" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(0)}
              >
                <span>Exploitative Business Models</span>
                <span className="accordion-icon">
                  {openAccordion === 0 ? "—" : "+"}
                </span>
              </button>
              <div
                className={`accordion-body-wrapper ${
                  openAccordion === 0 ? "is-open" : ""
                }`}
              >
                <div className="accordion-body-inner">
                  <div className="accordion-body">
                    When a product is free to use, the data users generate is
                    the real product being sold to others. Whether it's to sell
                    targeted advertisements or to train AI models, personal
                    information is harvested like a crop and productized without
                    meaningful consent or benefit to the user generating that
                    value.
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`accordion-item ${
                openAccordion === 1 ? "is-open" : ""
              }`}
            >
              <button
                className="accordion-header"
                onClick={() => toggleAccordion(1)}
              >
                <span>Entrapping Subscription Lock-In</span>
                <span className="accordion-icon">
                  {openAccordion === 1 ? "—" : "+"}
                </span>
              </button>
              <div
                className={`accordion-body-wrapper ${
                  openAccordion === 1 ? "is-open" : ""
                }`}
              >
                <div className="accordion-body-inner">
                  <div className="accordion-body">
                    Subscription-based software platforms are designed for
                    retention through complexity and data captivity, which makes
                    switching costs deliberately high. Convenience comes at the
                    cost of freedom.
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
            HCCF pursues its mission through four reinforcing initiatives:
            infrastructure, standards, certification, and community support.
          </p>
        </div>

        <div
          className="response-right"
          style={{ backgroundImage: `url(${heroImg4})` }}
        >
          <div className="response-card-overlay">
            <div className="card-badge-icon"></div>
            <span className="card-category">INFRASTRUCTURE</span>
            <p className="card-text">
              As an approved participant in ICANN's Applicant Support Program
              (ASP), we are applying for a new generic Top-Level Domain (gTLD)
              designed around human-centered principles. This namespace will
              serve as a secure home for human-centered technologies, governed
              by built-in anti-abuse protections and equitable access rules.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="page-cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2 className="cta-title">
              Want to build an ethical digital web together?
            </h2>
            <p className="cta-description">
              Whether you are an engineer, researcher, privacy advocate, or
              curious user, we invite you to connect with us and help redefine
              technology for human empowerment.
            </p>
            <button
              className="cta-btn"
              onClick={() => navigate("/get-involved")}
            >
              Get in Touch &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;