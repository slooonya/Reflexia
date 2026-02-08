import { Button } from '../../components/Button';

import EditIcon from '../../assets/icons/edit-icon.svg';
import ReflectIcon from '../../assets/icons/reflect-icon.svg';
import './SummarySection.css';

export function SummarySection({ summary, type, id }) {
  return (
    <div className="summary-container">
      <h1>Summary</h1>
      <hr />
      <p>{summary}</p>

      <div className="action-btns">
        <Button to={`/editing/${type}/${id}`} icon={EditIcon}>Edit</Button>
        <Button to={`/reflection/${type}/${id}`} icon={ReflectIcon}>Reflect</Button>
      </div>
    </div>
  );
}