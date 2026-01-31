import CloseIcon from '../assets/icons/close-icon-black.svg';
import './ConfirmModal.css';

export function ConfirmModal({ title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel }) {
  return (
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
          <button className="secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className="primary" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}