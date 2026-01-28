import { useState } from 'react';
import { BackButton } from '../components/BackButton';
import { Polaroid } from '../components/Polaroid';
import { Navbar } from '../components/Navbar';
import { SummarySection } from '../components/SummarySection';
import TestImage from '../assets/images/test-image.jpg';
import './DetailsPage.css';

export function DetailsPage() {
  const [index, setIndex] = useState(0);
  const images = [TestImage, TestImage, TestImage]

  return (
    <>
      <title>... Details</title>

      <Navbar />
      <div className="details-back">
        <BackButton />
      </div>

      <div className="details-page-content">
        <div className="details-left-container">
          <div className="polaroid-container">
            <Polaroid imageSrc={images[index]} caption={`Image ${index + 1}`} />
          </div>

          <div className="controls">
            <button className={`${index === 0 ? "disabled" : ""}`} 
                    onClick={() => setIndex(Math.max(0, index - 1))}>
              ‹
            </button>

            <button className={`${index === images.length - 1 ? "disabled" : ""}`}
                    onClick={() => setIndex(Math.min(images.length - 1, index + 1))}>
              ›
            </button>
          </div>
        </div>

        <div className="details-right-container">
          <SummarySection />
        </div>
      </div>
    </>
  );
}