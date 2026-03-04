import './StepCard.css';

export function StepCard({ title, description, icon }) {
  return (
    <div className="step-card">
      <img src={icon} alt="" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}