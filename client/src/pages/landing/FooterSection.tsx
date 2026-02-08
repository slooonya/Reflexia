import { Button } from '../../components/Button';
import './FooterSection.css';

export function FooterSection() {
  return (
    <section className="footer">
      <div className="footer-content">
        <div className="footer-top">
          <h2>Ready to start <br />consuming mindfully?</h2>
          <Button to="/auth" className="start-btn">Start</Button>
        </div>

        <div className="copyright">
          © Reflexia 2026
        </div>
      </div>
    </section>
  );
}