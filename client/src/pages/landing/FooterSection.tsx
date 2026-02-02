import { Link } from 'react-router';
import './FooterSection.css';

export function FooterSection() {
  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <h2>Ready to start <br />consuming mindfully?</h2>
          <Link to="/auth" className="start-btn">Start</Link>
        </div>

        <div className="copyright">
          © Reflexia 2026
        </div>
      </div>
    </section>
  );
}