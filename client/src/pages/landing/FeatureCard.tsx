import './FeatureCard.css';

export function FeatureCard({ title, description, icon }) {
  return (
    <div className="feature-card">
      <img src={icon} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}