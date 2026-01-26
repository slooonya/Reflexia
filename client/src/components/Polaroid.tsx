import './Polaroid.css';

type PolaroidProps = {
  imageSrc: string;
  caption: string;
};

export function Polaroid({ imageSrc, caption }: PolaroidProps) {
  return (
    <div className="polaroid">
      <img className="polaroid-image" src={imageSrc} />
      <div className="polaroid-caption">{caption}</div>
    </div>
  );
}