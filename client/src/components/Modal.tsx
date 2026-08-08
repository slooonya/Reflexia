import { createPortal } from "react-dom";
import CloseIcon from '../assets/icons/close-icon-black.svg';

import './Modal.css';

export function Modal({children, onClose}) {
  function handleBackdropClick(e) {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal">
        <div className="close-btn">
          <button onClick={onClose}>
            <img src={CloseIcon} alt="Close"/>
          </button>
        </div>

        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}