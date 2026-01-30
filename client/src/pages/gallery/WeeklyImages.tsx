import TestImage from '../../assets/images/test-image.png';
import './WeeklyImages.css';

export function WeeklyImages() {
  return (
    <div className="weekly-images">
      <img src={TestImage} alt="" />
      <img src={TestImage} alt="" />
      <img src={TestImage} alt="" />
      <img src={TestImage} alt="" />
      <img src={TestImage} alt="" />
    </div>
  );
}