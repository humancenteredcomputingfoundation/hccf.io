import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../index.css';
import logoImg from '../assets/logo.png';

type ThemeMode = 'light' | 'dark' | 'system';

/* SVG Icon Components for Sun, Moon, and Computer */
const SunIcon: React.FC<{ className?: string }> = ({ className = 'theme-icon-svg' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-10.96c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06zM7.05 18.36c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06z"/>
  </svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className = 'theme-icon-svg' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12.3 2c-.43 0-.76.35-.71.78.36 3.35-1.01 6.72-3.7 8.52-2.69 1.8-6.18 1.85-8.91.13-.37-.23-.86-.02-.95.4-.73 3.08.12 6.35 2.27 8.5 2.15 2.15 5.42 3 8.5 2.27 4.88-1.15 8.4-5.55 8.4-10.6 0-5.05-3.52-9.45-8.4-10.6-.17-.04-.34-.08-.5-.08zM9.27 12.82c3.21-1.28 5.61-4.08 6.22-7.51 3.01 1.58 5.01 4.72 5.01 8.29 0 5.18-4.22 9.4-9.4 9.4-3.57 0-6.71-2-8.29-5.01 3.43-.61 6.23-3.01 7.51-6.22z"/>
  </svg>
);

const SystemIcon: React.FC<{ className?: string }> = ({ className = 'theme-icon-svg' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M20 3H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6l-2 3v1h8v-1l-2-3h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H4V5h16v10z"/>
  </svg>
);

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState<boolean>(false);
  const [getInvolvedDropdownOpen, setGetInvolvedDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Theme control states
  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    return (localStorage.getItem('themeMode') as ThemeMode) || 'system';
  });
  const [mobileThemeOpen, setMobileThemeOpen] = useState<boolean>(false);
  const [desktopThemeOpen, setDesktopThemeOpen] = useState<boolean>(false);

  const mobileThemeRef = useRef<HTMLDivElement>(null);
  const desktopThemeRef = useRef<HTMLDivElement>(null);

  const location = useLocation();
  const [activeItem, setActiveItem] = useState<string>('HOME');

  // Sync active menu item
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
      case '/gtld-journey':
        setActiveItem('GTLD');
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

  // Theme management hook
  useEffect(() => {
    const root = document.documentElement;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyTheme = () => {
      if (themeMode === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else if (themeMode === 'light') {
        root.setAttribute('data-theme', 'light');
      } else {
        root.setAttribute('data-theme', mediaQuery.matches ? 'dark' : 'light');
      }
    };

    applyTheme();
    localStorage.setItem('themeMode', themeMode);

    const handleSystemChange = () => {
      if (themeMode === 'system') {
        applyTheme();
      }
    };

    mediaQuery.addEventListener('change', handleSystemChange);
    return () => mediaQuery.removeEventListener('change', handleSystemChange);
  }, [themeMode]);

  // Close theme menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        mobileThemeRef.current &&
        !mobileThemeRef.current.contains(e.target as Node)
      ) {
        setMobileThemeOpen(false);
      }
      if (
        desktopThemeRef.current &&
        !desktopThemeRef.current.contains(e.target as Node)
      ) {
        setDesktopThemeOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (itemName: string) => {
    setActiveItem(itemName);
    setIsOpen(false);
    setAboutDropdownOpen(false);
    setGetInvolvedDropdownOpen(false);
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'MISSION', path: '/mission' },
    { name: 'WHAT WE BUILD', path: '/what-we-build' },
  ];

  const ThemeDropdownOptions = ({ closeMenu }: { closeMenu: () => void }) => (
    <div className="theme-dropdown">
      <button
        className={`theme-option ${themeMode === 'light' ? 'active' : ''}`}
        onClick={() => {
          setThemeMode('light');
          closeMenu();
        }}
      >
        <SunIcon />
        <span>Light</span>
      </button>
      <button
        className={`theme-option ${themeMode === 'dark' ? 'active' : ''}`}
        onClick={() => {
          setThemeMode('dark');
          closeMenu();
        }}
      >
        <MoonIcon />
        <span>Dark</span>
      </button>
      <button
        className={`theme-option ${themeMode === 'system' ? 'active' : ''}`}
        onClick={() => {
          setThemeMode('system');
          closeMenu();
        }}
      >
        <SystemIcon />
        <span>System</span>
      </button>
    </div>
  );

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      {/* Logo */}
      <div className="logo-container">
        <Link to="/" onClick={() => handleNavClick('HOME')}>
          <img src={logoImg} alt="HCCF Logo" className="logo-image" />
        </Link>
      </div>

      {/* Mobile top-right controls (Theme Toggle + Hamburger) */}
      <div className="nav-controls">
        <div className="theme-controller mobile-theme-controller" ref={mobileThemeRef}>
          <button
            className="theme-toggle-btn"
            onClick={() => setMobileThemeOpen(!mobileThemeOpen)}
            aria-label="Toggle theme menu"
          >
            {themeMode === 'light' && <SunIcon />}
            {themeMode === 'dark' && <MoonIcon />}
            {themeMode === 'system' && <SystemIcon />}
          </button>

          {mobileThemeOpen && (
            <ThemeDropdownOptions closeMenu={() => setMobileThemeOpen(false)} />
          )}
        </div>

        {/* Mobile Hamburger Icon */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle Navigation">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Navigation Links */}
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

        {/* ABOUT Dropdown */}
        <li
          className={`nav-item dropdown ${
            activeItem === 'ABOUT' || activeItem === 'GTLD' ? 'active' : ''
          } ${aboutDropdownOpen ? 'dropdown-open' : ''}`}
          onMouseEnter={() => setAboutDropdownOpen(true)}
          onMouseLeave={() => setAboutDropdownOpen(false)}
        >
          <div
            className="dropdown-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setAboutDropdownOpen(!aboutDropdownOpen);
            }}
          >
            <Link
              to="/about"
              className="nav-link"
              onClick={() => handleNavClick('ABOUT')}
            >
              ABOUT
            </Link>
            <span className="dropdown-icon">▾</span>
          </div>

          <ul className="dropdown-menu">
            <li className="dropdown-item">
              <Link
                to="/gtld-journey"
                className={`dropdown-link ${activeItem === 'GTLD' ? 'active-sublink' : ''}`}
                onClick={() => handleNavClick('GTLD')}
              >
                OUR SUBMISSION JOURNEY
              </Link>
            </li>
          </ul>
        </li>

        {/* BLOG Link */}
        <li className={`nav-item ${activeItem === 'BLOG' ? 'active' : ''}`}>
          <Link
            to="/blog"
            className="nav-link"
            onClick={() => handleNavClick('BLOG')}
          >
            BLOG
          </Link>
        </li>

        {/* GET INVOLVED Dropdown */}
        <li
          className={`nav-item dropdown ${
            activeItem === 'GET INVOLVED' || activeItem === 'COMMUNITY' ? 'active' : ''
          } ${getInvolvedDropdownOpen ? 'dropdown-open' : ''}`}
          onMouseEnter={() => setGetInvolvedDropdownOpen(true)}
          onMouseLeave={() => setGetInvolvedDropdownOpen(false)}
        >
          <div
            className="dropdown-trigger"
            onClick={(e) => {
              e.stopPropagation();
              setGetInvolvedDropdownOpen(!getInvolvedDropdownOpen);
            }}
          >
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
                onClick={() => handleNavClick('COMMUNITY')}
              >
                COMMUNITY
              </a>
            </li>
          </ul>
        </li>

        {/* Desktop-only Theme Controller Item inside Nav Links */}
        <li className="nav-item desktop-theme-item">
          <div className="theme-controller" ref={desktopThemeRef}>
            <button
              className="theme-toggle-btn"
              onClick={() => setDesktopThemeOpen(!desktopThemeOpen)}
              aria-label="Toggle theme menu"
            >
              {themeMode === 'light' && <SunIcon />}
              {themeMode === 'dark' && <MoonIcon />}
              {themeMode === 'system' && <SystemIcon />}
            </button>

            {desktopThemeOpen && (
              <ThemeDropdownOptions closeMenu={() => setDesktopThemeOpen(false)} />
            )}
          </div>
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