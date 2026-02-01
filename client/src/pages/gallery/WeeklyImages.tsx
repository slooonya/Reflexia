import TestImage from '../../assets/images/test-image.png';
import './WeeklyImages.css';

export function WeeklyImages() {
  const images = [TestImage, TestImage, TestImage, TestImage, TestImage];

  return (
    <div className="weekly-images">
      {images.map((img, i) => (
        <div key={i} className="weekly-image">
          <img src={img} />
          <span>Week {i + 1}</span>
        </div>
      ))}
    </div>
  );
}