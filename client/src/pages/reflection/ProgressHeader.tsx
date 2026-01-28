import { useNavigate } from 'react-router';
import ExitIcon from '../../assets/icons/close-icon-brown.svg';
import BackIcon from '../../assets/icons/back-icon-brown.svg';
import './ProgressHeader.css';

type ProgressHeaderProps = {
  step: number,
  total: number,
  onBack: () => void
}

export function ProgressHeader({ step, total, onBack }: ProgressHeaderProps) {
  const progress = (step + 1) / total;
  const navigate = useNavigate();

  return (
    <>
    <div className='progress-header'>
      <div className="session-action">
        {step === 0 ? (
          <button className="icon-btn" onClick={() => navigate(-1)}>
            <img src={ExitIcon} />
          </button>
        ) : (
          <button className="icon-btn" onClick={onBack}>
            <img src={BackIcon} />
          </button>
        )}
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
        </div>
      </div>

      <div className="progress-steps">
        {step + 1} / {total}
      </div>
    </div>
    </>
  );
}