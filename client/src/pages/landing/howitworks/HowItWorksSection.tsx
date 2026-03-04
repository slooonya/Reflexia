import { useEffect, useRef, useState } from 'react';
import { StepCard } from './StepCard';
import { steps } from './stepsData';

import './HowItWorksSection.css';

export function HowItWorksSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = refs.current.indexOf(entry.target as HTMLDivElement);
            if (index !== -1) {
              setActiveIndex(index);
            }
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0
      }
    );

    refs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="how-it-works" id="how-it-works">
      <h2>How It Works</h2>

      <div className="how-it-works-container">
        <div className="how-it-works-left">
          <div className="image-frame">
            {steps.map((step, index) => (
              <img key={index} src={step.image} className={`step-image ${index === activeIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>

        <div className="how-it-works-right">
          {steps.map((step, index) => (
            <div key={index} ref={(el) => {refs.current[index] = el;}}>
              <StepCard title={step.title} description={step.description} icon={step.icon}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}