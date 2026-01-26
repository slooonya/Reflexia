import TestImage from '../assets/test-image.jpg';
import './Polaroid.css';

export function Polaroid() {
  return (
    <div className="polaroid">
      <img className="polaroid-image" src={TestImage} />
      <div className="polaroid-caption">Jan. 26 - Feb. 1</div>
    </div>
  );
}