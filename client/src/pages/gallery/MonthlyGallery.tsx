import { Polaroid } from '../../components/Polaroid';
import { WeeklyImages } from './WeeklyImages';
import TestImage from '../../assets/images/test-image.png';
import './MonthlyGallery.css'

export function MonthlyGallery() {
  return (
    <>
      <title>Monthly Gallery</title>

      <div className="monthly-gallery-grid">   
        <div className="monthly-gallery-slot">
          <WeeklyImages />

          <div className="monthly-image">
            <Polaroid imageSrc={TestImage} caption='February' />
          </div>
        </div>

        <div className="monthly-gallery-slot">
          <WeeklyImages />

          <div className="monthly-image">
            <Polaroid imageSrc={TestImage} caption='March' />
          </div>
        </div>

        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
        <div className="grid-slot"></div>
      </div>
    </>
  );
}