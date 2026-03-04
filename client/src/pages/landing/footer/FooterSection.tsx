import { Button } from '../../../components/Button';
import { Sticker } from './Sticker';

import Sticker1 from '../../../assets/images/sticker-1.svg';
import Sticker2 from '../../../assets/images/sticker-2.svg';
import Sticker3 from '../../../assets/images/sticker-3.svg';
import './FooterSection.css';

export function FooterSection() {
  return (
    <section className="footer">
      <div className="footer-content">
        <Sticker src={Sticker1} className="sticker-1" rotation={8}/>
        <Sticker src={Sticker2} className="sticker-2" rotation={4}/>
        <Sticker src={Sticker3} className="sticker-3" rotation={-4}/>

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