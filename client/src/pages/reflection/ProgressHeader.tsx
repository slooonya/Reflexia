import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ConfirmModal } from '../../components/ConfirmModal';
import { ProgressBar } from '../../components/ProgressBar';

import ExitIcon from '../../assets/icons/close-icon-brown.svg';
import BackIcon from '../../assets/icons/back-icon-brown.svg';
import './ProgressHeader.css';

export function ProgressHeader({ step, total, onBack }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { type, id } = useParams();

  const progress = step / total * 100;
  const navigate = useNavigate();

  function exit() {
    navigate(`/details/${type}/${id}`);
  }

  return (
    <>
      <div className='progress-header'>
        <div className="session-action">
          {step === 0 ? (
            <button className="icon-btn" onClick={() => setShowConfirm(true)}>
              <img src={ExitIcon} />
            </button>
          ) : (
            <button className="icon-btn" onClick={onBack}>
              <img src={BackIcon} />
            </button>
          )}
        </div>

        <div className="progress-bar-container">
          <ProgressBar progress={progress} />
        </div>

        <div className="progress-steps">
          {step} / {total}
        </div>
      </div>

      {showConfirm && (
        <ConfirmModal title={"Exit Reflection Session?"} message={"Your progress in this reflection session will be lost."} confirmLabel={"Exit"} onCancel={() => setShowConfirm(false)} onConfirm={exit}/>
      )}
    </>
  );
}