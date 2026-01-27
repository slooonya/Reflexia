import { useState } from "react";
import { Navbar } from "../components/Navbar";
import UploadIcon from "../assets/icons/upload-icon-brown.svg";
import CloseIcon from "../assets/icons/close-icon.svg";
import Step1 from '../assets/images/instruction-step-1.png';
import Step2 from '../assets/images/instruction-step-2.png';
import Step3 from '../assets/images/instruction-step-3.png';
import Step4 from '../assets/images/instruction-step-4.png';
import Step5 from '../assets/images/instruction-step-5.png';
import Step6 from '../assets/images/instruction-step-6.png';
import './UploadPage.css';

export function UploadPage() {
  const steps = [
    {
      image: Step1,
      description: <>
                      Visit <a href="https://takeout.google.com">Google Takeout</a> and select 
                      <strong> YouTube and Youtube Music</strong>.
                   </>
    },
    {
      image: Step2,
      description: <>Under 'Multiple formats,' select <strong>JSON for History.</strong></>
    },
    {
      image: Step3,
      description: <>Under 'All Youtube data included,' select <strong>'history'</strong>.</>
    },
    {
      image: Step4,
      description: <>Click on <strong>'Create export.'</strong></>
    },
    {
      image: Step5,
      description: <>After a few minutes, check your email and <strong>download the data report.</strong></>
    },
    {
      image: Step6,
      description: <>
                    Unzip the file and upload the <code>watch-history.json</code> file. 
                    It can be found at <code>Takeout/YouTube and YouTube Music/history/watch-history.json</code>.
                   </>
    }
  ]

  const [currentStep, setCurrentStep] = useState(0);
  const [isImageOpen, setIsImageOpen] = useState(false);

  return (
    <>
      <title>Watch History Upload</title>

      <Navbar />

      <div className="upload-container">
        <div className="upload-left">
          <h1>Upload <br />
              Your Watch <br />
              History
          </h1>

          <p>To generate reflective summaries and images, we'll need a copy of your YouTube report. You can retrieve the data by following the instructions.</p>

          <div className="upload-box">
            <label htmlFor="upload">
              <input type="file" id="upload" accept=".json"/>
              <img src={UploadIcon} />
              <span>Select a file to upload</span>
              <small>Supported format: .json</small>
            </label>
          </div>
        </div>

        <div className="upload-right">
          <div className="steps">
            {steps.map((_, index) => (
              <button key={index} 
                      className={`step ${index === currentStep ? "active" : ""}`} 
                      onClick={() => setCurrentStep(index)}>
                {index + 1}
              </button>
            ))}
          </div>

          <div className="instruction-carousel">
            <button className={`nav-btn ${currentStep === 0 ? "disabled" : ""}`} 
                    onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}>
              ‹
            </button>
            
            <div className="instruction-polaroid">
              <div className="instruction-image" onClick={() => setIsImageOpen(true)}>
                <img src={steps[currentStep].image} />
              </div>
              
              <p className="instruction-description">{steps[currentStep].description}</p>
            </div>
            
            <button className={`nav-btn ${currentStep === steps.length - 1 ? "disabled" : ""}`} 
                    onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
              ›
            </button>
          </div>
        </div>
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