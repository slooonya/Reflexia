import { useState } from "react";

import type { InstructionStep } from "./UploadPage";
import CloseIcon from "../../assets/icons/close-icon.svg";
import './InstructionCarousel.css';

type InstructionCarouselProps = {
  steps: InstructionStep[]
}

export function InstructionCarousel({ steps }: InstructionCarouselProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <div className="step-indicator">
        {steps.map((_, index) => (
          <button key={index} 
                  className={`step ${index === currentStep ? "active" : ""}`} 
                  onClick={() => setCurrentStep(index)}>
            {index + 1}
          </button>
        ))}
      </div>

      <div className="instruction-container">
        <button className={`nav-btn ${currentStep === 0 ? "disabled" : ""}`} 
                onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
          ‹
        </button>
        
        <div className="instruction-box">
          <div className="step-illustration" onClick={() => setIsImageOpen(true)}>
            <img src={steps[currentStep].image} />
          </div>
          
          <p className="step-description">{steps[currentStep].description}</p>
        </div>
        
        <button className={`nav-btn ${currentStep === steps.length - 1 ? "disabled" : ""}`} 
                onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
          ›
        </button>
      </div>

      {isImageOpen && (
        <div className="image-overlay" onClick={() => setIsImageOpen(false)}>
          <img src={CloseIcon} className="close-icon" onClick={() => setIsImageOpen(false)}/>
          <img src={steps[currentStep].image} />
        </div>
      )}
    </>
  );
}