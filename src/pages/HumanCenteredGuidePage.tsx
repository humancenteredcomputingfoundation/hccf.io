import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const HumanCenteredGuidePage: React.FC = () => (
  <div className="gtld-page">
    <section className="gtld-hero-section"><div className="section-container">
      <span className="gtld-tag">HCCF EXPLAINER</span>
      <h1 className="gtld-hero-title">What is <span className="title-teal">human-centered computing?</span></h1>
      <p className="gtld-hero-text">Human-centered computing puts the needs, privacy, and autonomy of the individual using technology at the center of how it is designed and operated.</p>
    </div></section>
    <section className="gtld-about-section"><div className="section-container">
      <div className="gtld-two-col hccf-guide-columns"><div className="gtld-col-text">
        <h2 className="gtld-section-title">People over profits</h2>
        <p>The Human-Centered Computing Foundation (HCCF) seeks to foster an alternative market for technology products that operate for the benefit of individual users. Its approach emphasizes data sovereignty, personal autonomy, and engineering that serves human needs.</p>
        <p>HCCF advocates for products that give people meaningful control over their information, rather than treating personal data primarily as a resource to extract.</p>
      </div><div className="gtld-col-text">
        <h2 className="gtld-section-title">Four connected initiatives</h2>
        <ul className="gtld-feature-list">
          <li>A proposed human-centered generic top-level domain.</li>
          <li>Open technical standards for privacy, usability, and interoperability.</li>
          <li>A proposed product certification program based on human benefit and user control.</li>
          <li>Technology assistance for other nonprofit organizations.</li>
        </ul>
      </div></div>
      <p><Link className="gtld-inline-link" to="/what-we-build">Explore what we build</Link> · <Link className="gtld-inline-link" to="/self">Learn about .self</Link></p>
    </div></section>
  </div>
);
export default HumanCenteredGuidePage;
