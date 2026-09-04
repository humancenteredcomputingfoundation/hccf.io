import React from 'react';

export const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="section contact-section">
      <h2>Let's build the human-centered future together</h2>
      <p className="intro">
        Whether you're a technology company, a nonprofit, a potential funder, or simply someone who believes technology should serve people, we want to hear from you.
      </p>
      <div className="contact-details">
        <div>
          <h3>Reach Out</h3>
          <p>
            We're a lean, mission-driven team. Every message is read by the people who built this organization. We welcome partnerships, grant inquiries, nonprofit support requests, and general expressions of solidarity.
          </p>
        </div>
        <div className="contact-info">
          <div>
            <h4>Email</h4>
            <a href="mailto:contact@hccf.onmy.cloud">contact@hccf.onmy.cloud</a>
          </div>
          <div>
            <h4>Headquarters</h4>
            <p>United States</p>
          </div>
        </div>
      </div>
    </section>
  );
};