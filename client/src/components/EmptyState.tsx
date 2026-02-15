import { Button } from '../components/Button';
import './EmptyState.css';

export function EmptyState({ img, title, text, action, actionLabel, btnIcon, variant }) {
  return (
    <div className="empty-state">
      <img src={img} className="empty-icon" />
      <h2 className={`title-${variant}`}>{title}</h2>
      <p>{text}</p>

      <Button variant={variant} onClick={action} icon={btnIcon}>
        {actionLabel}
      </Button>
    </div>
  );
}