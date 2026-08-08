import './StepCard.css';

export function StepCard({ title, description, icon: Icon }) {
  return (
    <div className="step-card">
      <Icon className="step-icon" />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}