import { Button } from '../../components/Button';
import { EmptyState } from '../../components/EmptyState';
import { useNavigate } from 'react-router';

import EditIcon from '../../assets/icons/edit-icon.svg';
import ReflectIcon from '../../assets/icons/reflect-icon.svg';
import EmptyImg from '../../assets/images/empty.svg';
import './SummarySection.css';

export function SummarySection({ summary, type, id }) {
  const navigate = useNavigate();

  if (summary) {
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
  } else {
    return (
      <EmptyState img={EmptyImg} title={"No reflection yet"} text={"You haven't completed a reflection session."} 
                  action={() => navigate(`/reflection/${type}/${id}`)} actionLabel={"Reflect"} 
                  btnIcon={ReflectIcon} variant="primary" />
    );
  }
}