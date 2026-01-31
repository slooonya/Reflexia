import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ConfirmModal } from '../../components/ConfirmModal';

import ExitIcon from '../../assets/icons/close-icon-brown.svg';
import BackIcon from '../../assets/icons/back-icon-brown.svg';
import './ProgressHeader.css';

export function ProgressHeader({ step, total, onBack }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const progress = step / total;
  const navigate = useNavigate();

  function exit() {
    navigate(-1);
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
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
          </div>
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