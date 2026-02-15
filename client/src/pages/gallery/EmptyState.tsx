import { Button } from '../../components/Button';
import './EmptyState.css';

export function EmptyState({ img, title, text, action, actionLabel, btnIcon }) {
  return (
    <div className="empty-state">
      <img src={img} className="empty-icon" />
      <h2>{title}</h2>
      <p>{text}</p>

      <Button variant="accent" onClick={action} icon={btnIcon}>
        {actionLabel}
      </Button>
    </div>
  );
}