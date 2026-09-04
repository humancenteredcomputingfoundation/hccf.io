import React, { useState } from 'react';
import '../index.css';

interface ValueItem {
  title: string;
  content: string;
}

const valuesData: ValueItem[] = [
  {
    title: 'People Over Profits',
    content:
      'We believe that technology\'s primary purpose is to serve people, not capital. Profit is a tool like any other, and while financial sustainability is necessary, overzealous commitment to profit as its own end has a dangerous tendency to create perverse incentive structures. We actively guard against these perverse incentives that prioritize money over human well-being. Our commitment is to structure our models and partnerships to ensure that human dignity and autonomy are never compromised over profit.',
  },
  {
    title: 'Personal Data is Sacred',
    content:
      'Personal data belongs entirely to the individual. We design and advocate for systems that preserve user privacy by default, preventing unauthorized monetization, surveillance, and data exploitation.',
  },
  {
    title: 'Technical Excellence',
    content:
      'Building human-centered alternatives requires uncompromised technical rigor, robust security, scalable infrastructure, and forward-thinking architecture.',
  },
  {
    title: 'Conscious Trade-offs',
    content:
      'We carefully evaluate every design and business decision, choosing transparency and long-term user empowerment over short-term expediency or superficial convenience.',
  },
  {
    title: 'Courtesy is Guaranteed',
    content:
      'We foster respectful, transparent, and inclusive interactions across our community, partnerships, and software ecosystems.',
  },
];

const MissionPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mission-page">
      {/* 1. OUR MISSION SECTION */}
      <section className="mission-hero-section">
        <div className="section-container">
          <h1 className="mission-page-title">Our Mission</h1>
          <p className="mission-hero-text">
            We serve as a nexus between industry, academia, digital rights organizations, and the general public to work together to understand and address issues related to technology and the humans that use them. Our first core objective is to own and operate a unique Top-Level Domain that is dedicated solely to creating a network of human-centered devices operating at human scale, i.e. self-hosting.
          </p>
        </div>
      </section>

      {/* 2. OUR VISION SECTION */}
      <section className="vision-section">
        <div className="section-container">
          <h2 className="vision-title">Our Vision</h2>
          <p className="vision-text">
            To foster an alternative market for technology products which operate exclusively for the benefit of the individual human user.
          </p>
        </div>
      </section>

      {/* 3. OUR VALUES SECTION */}
      <section className="values-section">
        <div className="values-container">
          <div className="values-left">
            <h2 className="values-title">Our Values</h2>
          </div>

          <div className="values-right">
            <div className="values-card">
              {valuesData.map((item, idx) => (
                <div
                  key={item.title}
                  className={`values-item ${openIndex === idx ? 'is-open' : ''}`}
                >
                  <button
                    className="values-header"
                    onClick={() => toggleAccordion(idx)}
                  >
                    <span className="values-header-text">{item.title}</span>
                    <span className="values-icon">
                      {openIndex === idx ? '—' : '+'}
                    </span>
                  </button>

                  {openIndex === idx && (
                    <div className="values-body">
                      <p>{item.content}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;