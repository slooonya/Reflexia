import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Polaroid } from '../../../components/Polaroid';
import { polaroids_top_row, polaroids_bottom_row } from './polaroidsData';

import './PolaroidsSection.css';

export function PolaroidsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [-600, 300]);
  const x2 = useTransform(scrollYProgress, [0, 1], [0, -600]);

  return (
    <section className="polaroids-demo" id="polaroids" ref={sectionRef}>

      <div className="sticky-container">
        <motion.div className="row top" style={{ x: x1 }}>
          {polaroids_top_row.map((item, index) => (
            <div className="polaroid-slot" key={index}>
              <Polaroid imageSrc={item.image} caption={item.caption}/>
            </div>
          ))}
        </motion.div>

        <motion.div className="row bottom" style={{ x: x2 }}>
          {polaroids_bottom_row.map((item, index) => (
            <div className="polaroid-slot" key={index} >
              <Polaroid imageSrc={item.image} caption={item.caption}/>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}