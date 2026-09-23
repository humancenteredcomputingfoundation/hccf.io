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
      'An individual’s digital data is sacred. From personal memories to private communications, a person’s data is a reflection of their identity and autonomy. We treat this data with respect and understand the profound personal meaning it has to them. We champion the principle of data sovereignty, where individuals have unequivocal ownership and control over their digital selves, and we build systems that embody this principle.',
  },
  {
    title: 'Technical Excellence',
    content:
      'Trust is earned through excellence, reliability, and accountability. We commit to the highest standards of engineering rigor in every system we design and every standard we publish. Our solutions must be ethically sound, robust, secure, and maintainable. This technical integrity is non-negotiable and forms the bedrock of the trust our community places in us.',
  },
  {
    title: 'Conscious Trade-offs',
    content:
      'We recognize that every engineering and policy choice involves a trade-off. We embrace this by making deliberate, conscious decisions that optimize for human benefit, even when those choices limit commercial scalability or violate some conventional wisdom of the tech industry. We are not building for every possible use case; we are building for our specific, human-centered mission.',
  },
  {
    title: 'Courtesy is Guaranteed',
    content:
      'We engage with all people: colleagues, partners, and critics alike, with a fundamental and unwavering level of respect and courtesy. We believe that profound disagreement can coexist with civil discourse, and that varied perspectives are essential for solving complex challenges. We will guarantee a respectful environment for all constructive collaboration.',
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
                      {openIndex === idx ? '-' : '+'}
                    </span>
                  </button>

                  <div className={`values-body-wrapper ${openIndex === idx ? 'is-open' : ''}`}>
                    <div className="values-body-inner">
                      <div className="values-body">
                        <p>{item.content}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION SECTION */}
      <section className="page-cta-section">
        <div className="section-container">
          <div className="cta-card">
            <h2 className="cta-title">Support Our Non-Profit Mission</h2>
            <p className="cta-description">
              As a 501(c)(3) nonprofit, 100% of your contributions directly fund our technical infrastructure, public advocacy, and mission-driven initiatives without commercial compromise.
            </p>
            <a
              href="https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-13253"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-btn cta-btn-link"
            >
              Donate Now &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MissionPage;