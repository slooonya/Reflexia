import { Polaroid } from '../components/Polaroid';
import './WeeklyGalleryPage.css'

export function WeeklyGalleryPage() {
  return (
    <>
      <title>Weekly Gallery</title>

      <div className="gallery-grid">
        <div className="grid-slot">
          <Polaroid />
        </div>
        <div className="grid-slot">
          <Polaroid />
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