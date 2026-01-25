import { NavLink, Link } from 'react-router';
import UploadIcon from '../assets/icons/upload-icon.svg';
import HomeIcon from '../assets/icons/home-icon.svg';
import ProfileIcon from '../assets/icons/profile-icon.svg';
import ActiveHomeIcon from '../assets/icons/home-active-icon.svg';
import ActiveProfileIcon from '../assets/icons/profile-active-icon.svg';

import './Navbar.css';

export function Navbar() {
  return (
      <nav className="navbar">
        <Link to="/" className="logo">Reflexia</Link>

        <div className="navbar-links">
          <NavLink to="/" className="navbar-link">
           {({ isActive }) => (
              <>
                <img className="navbar-icon" src={isActive ? ActiveHomeIcon : HomeIcon} />
                <span className="navbar-text">Home</span>
              </>
            )}
          </NavLink>

          <NavLink to="/profile" className="navbar-link">
            {({ isActive }) => (
              <>
                <img className="navbar-icon" src={isActive ? ActiveProfileIcon : ProfileIcon} />
                <span className="navbar-text">Profile</span>
              </>
            )}
          </NavLink>
        </div>

        <Link to="/upload" className="upload-btn">
          <img className="upload-icon" src={UploadIcon}></img>
          <span className="upload-text">Upload</span>
        </Link>
      </nav>
  );
}