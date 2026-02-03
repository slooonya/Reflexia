import { Link } from 'react-router';
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
        <Link to={`/editing/${type}/${id}`} className="action-btn">
          <img src={EditIcon}></img>
          <span>Edit</span>
        </Link>

        <Link to={`/reflection/${type}/${id}`} className="action-btn">
          <img src={ReflectIcon}></img>
          <span>Reflect</span>
        </Link>
      </div>
    </div>
  );
}