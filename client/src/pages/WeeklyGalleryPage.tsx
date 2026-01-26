import { Polaroid } from '../components/Polaroid';
import TestImage from '../assets/images/test-image.jpg';
import './WeeklyGalleryPage.css'

export function WeeklyGalleryPage() {
  return (
    <>
      <title>Weekly Gallery</title>

      <div className="gallery-grid">
        <div className="grid-slot">
          <Polaroid imageSrc={TestImage} caption={"Jan. 26 - Feb. 1"}/>
        </div>
        <div className="grid-slot">
          <Polaroid imageSrc={TestImage} caption={"Jan. 26 - Feb. 1"}/>
        </div>

        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
      </div>
    </>
  );
}