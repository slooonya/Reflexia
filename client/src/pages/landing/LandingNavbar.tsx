import { Link } from 'react-router';
import './LandingNavbar.css';

export function LandingNavbar() {
  return (
    <nav className="navbar">
      <a href="#hero" className="logo">Reflexia</a>

      <div className="navbar-links">
        <a href="#solution" className="navbar-link"> Solution</a>
        <a href="#benefits" className="navbar-link">Benefits</a>
        <a href="#features" className="navbar-link">Features</a>
      </div>

      <Link to="/auth" className="sign-in-btn">Sign In</Link>
    </nav>
  );
}