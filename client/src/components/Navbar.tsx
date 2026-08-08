import { NavLink, Link } from 'react-router';

import UploadIcon from '../assets/icons/upload-icon.svg?react';
import HomeIcon from '../assets/icons/home-icon.svg?react';
import ProfileIcon from '../assets/icons/profile-icon.svg?react';
import ActiveHomeIcon from '../assets/icons/home-active-icon.svg?react';
import ActiveProfileIcon from '../assets/icons/profile-active-icon.svg?react';
import './Navbar.css';

export function Navbar({ mode = "app" }) {
  return (
    <nav className="navbar">
      {mode === "app" ? (
        <Link to="/gallery" className="logo">Reflexia</Link>
      ) : (
        <a href="#hero" className="logo">Reflexia</a>
      )}
      

      <div className="navbar-links">
        {mode === "app" && (
          <>
            <NavLink to="/gallery" className="navbar-link">
              {({ isActive }) => {
                const Icon = isActive ? ActiveHomeIcon : HomeIcon;

                return (
                  <>
                    <Icon className="navbar-icon" />
                    <span className="navbar-text">Home</span>
                  </>
                );
              }}
            </NavLink>
            
            <NavLink to="/profile" className="navbar-link">
              {({ isActive }) => {
                const Icon = isActive ? ActiveProfileIcon : ProfileIcon;

                return (
                  <>
                    <Icon className="navbar-icon" />
                    <span className="navbar-text">Profile</span>
                  </>
                );
              }}
            </NavLink>
          </>
        )}
        
        {mode === "landing" && (
          <>
            <a href="#solution" className="navbar-link"> Solution</a>
            <a href="#how-it-works" className="navbar-link">Features</a>
            <a href="#faqs" className="navbar-link">FAQs</a>
          </>
        )}
      </div>

      {mode === "app" ? (
        <Link to="/upload" className="upload-btn">
          <UploadIcon className="upload-icn" />
          <span className="upload-text">Upload</span>
        </Link>
      ) : (
        <Link to="/auth" className="sign-in-btn">Sign In</Link>
      )}

    </nav>
  );
}