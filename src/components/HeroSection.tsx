import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-content">
        <h1>Technology That Serves Humanity</h1>
        <p>
          The Human-Centered Computing Foundation builds the infrastructure, standards, and
          ecosystem needed to make ethical technology the default, not the exception[cite: 1].
        </p>
      </div>
      <div className="hero-image-container">
        <img src="/logo.png" alt="HCCF Emblem" className="hero-logo-large" />
      </div>
    </section>
  );
};