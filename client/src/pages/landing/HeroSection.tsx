import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ParallaxGirl from '../../assets/images/parallax-girl.png';
import ParallaxBackground from '../../assets/images/parallax-background.png';
import ParallaxPollaroids from '../../assets/images/parallax-polaroids.png';
import './HeroSection.css';

export function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <img src={ParallaxBackground} className="hero-layer hero-bg" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.2}px))` }} />
      <img src={ParallaxPollaroids} className="hero-layer hero-polaroids" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.45}px))` }} />
      <img src={ParallaxGirl} className="hero-layer hero-center" style={{ transform: `translate(-50%, calc(-50% + ${scrollY * 0.65}px))` }} />

      <div className="hero-content">
        <h1>Reflexia</h1>
        <p>Your AI assistant for reflection <br /> on personal media consumption</p>
        <Link to="/auth" className="auth-btn">Start</Link>
      </div>
    </section>
  );
}