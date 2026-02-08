import { createPortal } from "react-dom";
import { Button } from "./Button";

import CloseIcon from '../assets/icons/close-icon-black.svg';
import './ConfirmModal.css';

export function ConfirmModal({ title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel }) {
  return createPortal(
    <div className="modal-backdrop">
      <div className="modal">
        <div className="close-btn">
          <button onClick={onCancel}>
            <img src={CloseIcon} />
          </button>
        </div>

        <h2>{title}</h2>
        <hr />
        <p>{message}</p>

        <div className="modal-actions">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}