import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';
import PamphletImg from '../assets/Pamphlet.png';

const SelfPage: React.FC = () => (
  <div className="gtld-page">
    <section className="gtld-hero-section"><div className="section-container">
      <span className="gtld-tag">PROPOSED DIGITAL NAMESPACE</span>
      <h1 className="gtld-hero-title">Introducing <span className="title-teal">.self</span></h1>
      <p className="gtld-hero-text">.self is a proposed generic top-level domain (gTLD) intended to support human-centered technology and personal digital autonomy. It is an initiative of the Human-Centered Computing Foundation (HCCF), a nonprofit organization.</p>
    </div></section>
    <section className="gtld-about-section"><div className="section-container">
      <h2 className="gtld-section-title">Why HCCF is proposing .self</h2>
      <div className="self-explanation-layout"><div className="self-stacked-content"><div className="gtld-col-text">
        <p>HCCF's mission is to help create technology that serves the people using it. The foundation proposes .self as a digital namespace designed for human-scale use, with an emphasis on privacy, data sovereignty, and personal autonomy.</p>
        <p>The intended beneficiaries are individuals and the technologies they use in their own lives, including tools that help people control their digital presence.</p>
      </div><div className="gtld-col-text">
        <h2 className="gtld-section-title">How .self could support self-hosting</h2>
        <p>HCCF envisions a namespace that helps personal devices and self-hosted services connect using open-source software clients. This could make it easier for human-centered products to work together without requiring people to rely entirely on centralized platforms.</p>
        <p>These are proposed objectives, not currently available domain services.</p>
      </div></div>
      <figure className="self-pamphlet-figure">
        <img src={PamphletImg} alt=".self pamphlet: proposed top-level domain for self-hosting, outlining its infrastructure and core features" loading="lazy" decoding="async" />
      </figure></div>
    </div></section>
    <section className="gtld-status-section"><div className="section-container">
      <h2 className="gtld-section-title">What is proposed and what is confirmed?</h2>
      <div className="gtld-status-card">
        <p className="gtld-card-text">The .self namespace and its associated technical services remain proposals. HCCF has documented its application milestones on the existing gTLD journey page. That page is the reference for the foundation's published status information; this overview does not claim approval, delegation, launch, or registration availability.</p>
        <p><Link className="gtld-inline-link" to="/self-gtld">Follow the .self application journey &rarr;</Link></p>
      </div>
    </div></section>
    <section className="page-cta-section"><div className="section-container"><div className="cta-card">
      <h2 className="cta-title">Follow the .self initiative</h2>
      <p className="cta-description">Subscribe through HCCF's existing newsletter to follow progress, or join the community conversation.</p>
      <div className="self-newsletter-embed">
        <iframe
          title="Get .self updates: HCCF newsletter signup powered by Zeffy"
          src="https://www.zeffy.com/en-US/embed/newsletter-form/sign-up-for-our-newsletter-3475"
          loading="lazy"
          allowTransparency={true}
        />
      </div>
      <div className="self-cta-actions">
        <a className="cta-btn" href="https://community.hccf.onmy.cloud/" target="_blank" rel="noopener noreferrer">Join the HCCF community</a>
        <a className="cta-btn" href="/dot-self.pdf" download="dot-self.pdf">Download the .self overview (PDF)</a>
      </div>
    </div></div></section>
  </div>
);
export default SelfPage;
