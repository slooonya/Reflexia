import './Polaroid.css';

export function Polaroid({ imageSrc, caption }) {
  return (
    <div className="polaroid">
      <img className="polaroid-image" src={imageSrc} loading="lazy"/>
      <div className="polaroid-caption">{caption}</div>
    </div>
  );
}