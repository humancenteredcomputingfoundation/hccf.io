import React, { useState } from 'react';
import '../index.css';

const GetInvolvedPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for signing up!');
    setFormData({ firstName: '', lastName: '', email: '' });
  };

  return (
    <div className="get-involved-page">
      {/* 1. HERO SECTION */}
      <section className="gi-hero-section">
        <div className="section-container">
          <h1 className="gi-hero-title">
            Let's build the human-centered future <span className="title-bold" style={{ color: '#000000' }}>together</span>
          </h1>
          <p className="gi-hero-text">
            Whether you're a technology company, a nonprofit, a potential funder, or simply someone who believes technology should serve people, we want to hear from you.
          </p>
        </div>
      </section>

      {/* 2. REACH OUT SECTION */}
      <section className="gi-reachout-section">
        <div className="gi-reachout-container">
          <h2 className="gi-reachout-title">Reach Out</h2>
          <p className="gi-reachout-text">
            We're a lean, mission-driven team. Every message is read by the people who built this organization. We welcome partnerships, grant inquiries, nonprofit support requests, and general expressions of solidarity.
          </p>

          {/* Contact Details */}
          <div className="gi-contact-info">
            <div className="gi-contact-item">
              <div className="gi-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="gi-details">
                <span className="gi-detail-label">Email</span>
                <a href="mailto:contact@hccf.onmy.cloud" className="gi-detail-value">contact@hccf.onmy.cloud</a>
              </div>
            </div>

            <div className="gi-contact-item">
              <div className="gi-icon-wrapper">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="gi-details">
                <span className="gi-detail-label">Headquarters</span>
                <span className="gi-detail-value">Denver, Colorado, USA</span>
              </div>
            </div>
          </div>

          <hr className="gi-divider" />

          {/* Social Links */}
          <div className="gi-ways-to-engage">
            <span className="gi-engage-title">Ways to engage right now:</span>
            <ul className="gi-social-list">
              <li>
                <a href="https://www.linkedin.com/company/humancenteredcomputing/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span>Follow Us on LinkedIn</span>
                </a>
              </li>
              <li>
                <a href="https://x.com/humanccf" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  <span>Follow Us on X/Twitter</span>
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/profile.php?id=61583647284804&sk=followers" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.01 11.49 5.5 13.8 5.5c1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.23 0-1.61.77-1.61 1.56V12h2.77l-.44 3h-2.33v6.8c4.56-.93 8-4.96 8-9.8z" />
                  </svg>
                  <span>Follow Us on Facebook</span>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/humancenteredcomputing/" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  <span>Follow Us on Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Teal Divider Between Sections */}
      <div className="gi-section-divider"></div>

      {/* 3. NEWSLETTER SIGN-UP SECTION */}
      <section className="gi-newsletter-section">
        <div className="section-container">
          <h2 className="gi-newsletter-title">
            Interested in following our progress and getting <br />
            a .self subdomain when they become available? <br />
            Sign up for our newsletter!
          </h2>

          <div className="gi-form-card">
            <h3 className="gi-form-heading">Newsletter Sign-up Form</h3>
            <form onSubmit={handleSubmit} className="gi-form">
              <div className="gi-form-row">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="gi-input"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="gi-input"
                />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                className="gi-input gi-input-full"
              />
              <button type="submit" className="gi-submit-btn">
                Submit
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GetInvolvedPage;