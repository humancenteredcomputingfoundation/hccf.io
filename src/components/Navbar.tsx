import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import logoImg from '../assets/logo.png';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('HOME');

  // Synchronize active menu item with current URL route
  useEffect(() => {
    switch (location.pathname) {
      case '/mission':
        setActiveItem('MISSION');
        break;
      case '/what-we-build':
        setActiveItem('WHAT WE BUILD');
        break;
      case '/about':
        setActiveItem('ABOUT');
        break;
      case '/blog':
        setActiveItem('BLOG');
        break;
      case '/get-involved':
        setActiveItem('GET INVOLVED');
        break;
      default:
        setActiveItem('HOME');
        break;
    }
  }, [location]);

  // Scroll detection hook
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const handleNavClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsOpen(false); // Close mobile drawer when an item is selected
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'MISSION', path: '/mission' },
    { name: 'WHAT WE BUILD', path: '/what-we-build' },
    { name: 'ABOUT', path: '/about' },
    { name: 'BLOG', path: '/blog' },
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="logo-container">
        <Link to="/" onClick={() => handleNavClick('HOME')}>
          <img src={logoImg} alt="HCCF Logo" className="logo-image" />
        </Link>
      </div>

      {/* Mobile Hamburger Icon */}
      <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </button>

      {/* Center Navigation Links */}
      <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
        {navItems.map((item) => (
          <li
            key={item.name}
            className={`nav-item ${activeItem === item.name ? 'active' : ''}`}
          >
            <Link
              to={item.path}
              className="nav-link"
              onClick={() => handleNavClick(item.name)}
            >
              {item.name}
            </Link>
          </li>
        ))}

        {/* GET INVOLVED Dropdown */}
        <li
          className={`nav-item dropdown ${
            activeItem === 'GET INVOLVED' || activeItem === 'COMMUNITY' ? 'active' : ''
          } ${dropdownOpen ? 'dropdown-open' : ''}`}
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <div className="dropdown-trigger" onClick={toggleDropdown}>
            <Link
              to="/get-involved"
              className="nav-link"
              onClick={() => handleNavClick('GET INVOLVED')}
            >
              GET INVOLVED
            </Link>
            <span className="dropdown-icon">▾</span>
          </div>

          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <a
                href="https://community.hccf.onmy.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className={`dropdown-link ${activeItem === 'COMMUNITY' ? 'active-sublink' : ''}`}
                onClick={() => {
                  setActiveItem('COMMUNITY');
                  setIsOpen(false);
                }}
              >
                COMMUNITY
              </a>
            </li>
          </ul>
        </li>

        {/* Mobile-only Donate Button */}
        <li className="mobile-donate-item">
          <a
            href="https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-13253"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="donate-btn">DONATE</button>
          </a>
        </li>
      </ul>

      {/* Desktop Donate Button */}
      <div className="desktop-donate">
        <a
          href="https://www.zeffy.com/en-US/donation-form/donate-to-change-lives-13253"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: 'none' }}
        >
          <button className="donate-btn">DONATE</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;