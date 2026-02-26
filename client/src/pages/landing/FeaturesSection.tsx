import { useEffect, useRef, useState } from 'react';
import { FeatureCard } from './FeatureCard';
import { features } from './featuresData';

import './FeaturesSection.css';

export function FeaturesSection() {
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
    <section className="features" id="features">
      <h2>Features</h2>

      <div className="features-container">
        <div className="features-left">
          <div className="image-frame">
            {features.map((feature, index) => (
              <img key={index} src={feature.image} className={`feature-image ${index === activeIndex ? "active" : ""}`} />
            ))}
          </div>
        </div>

        <div className="features-right">
          {features.map((feature, index) => (
            <div key={index} ref={(el) => {refs.current[index] = el;}}>
              <FeatureCard title={feature.title} description={feature.description} icon={feature.icon}/>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}