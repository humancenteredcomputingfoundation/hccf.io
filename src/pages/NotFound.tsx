import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found-page">
      <section className="not-found-hero-section">
        <div className="section-container">
          <span className="not-found-tag">404 ERROR</span>
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-text">
            The page you are looking for doesn't exist, has been moved, or the link may be broken. 
            Explore our site or learn more about our ongoing initiatives.
          </p>

          <div className="not-found-actions">
            <button 
              className="not-found-primary-btn" 
              onClick={() => navigate('/')}
            >
              &larr; Back to Home
            </button>
            
            <button 
              className="not-found-secondary-btn" 
              onClick={() => navigate('/gtld-journey')}
            >
              Explore gTLD Journey &rarr;
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFound;