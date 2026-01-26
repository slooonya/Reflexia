import { useNavigate } from 'react-router';
import BackIcon from '../assets/icons/back-icon.svg'
import './BackButton.css'

export function BackButton() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(-1)} className="back-btn">
          <img className="back-icon" src={BackIcon}></img>
          <span className="back-text">Go back</span>
    </button>
  );
}