import { useEffect, useState } from 'react';

import './Navbar.scss';
import { Link as ScrollLink } from 'react-scroll';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <button className="hamburger" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className="navbar-links">
          <li>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              to="contact">
              اتصل بنا
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              to="projects">
              المشاريع
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              to="services">
              الخدمات
            </ScrollLink>
          </li>
          <li>
            <ScrollLink
              spy={true}
              smooth={true}
              offset={-70}
              duration={1000}
              to="about">
              من نحن؟
            </ScrollLink>
          </li>
        </ul>

        <div className="navbar-logo">
          <img src="/whitelogo.png" alt="Logo" />
        </div>

        <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <button className="close-sidebar" onClick={toggleSidebar}>
            &times;
          </button>
          <ul className="sidebar-links">
            <li>
              <ScrollLink
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                to="about"
                onClick={toggleSidebar}>
                من نحن؟
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                to="services"
                onClick={toggleSidebar}>
                الخدمات
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                to="projects"
                onClick={toggleSidebar}>
                المشاريع
              </ScrollLink>
            </li>
            <li>
              <ScrollLink
                spy={true}
                smooth={true}
                offset={-70}
                duration={1000}
                to="contact"
                onClick={toggleSidebar}>
                اتصل بنا
              </ScrollLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
