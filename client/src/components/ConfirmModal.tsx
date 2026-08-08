import { Button } from "./Button";
import { Modal } from "./Modal";

import './ConfirmModal.css';

export function ConfirmModal({ title, message, confirmLabel = "Confirm", cancelLabel = "Continue", onConfirm, onCancel }) {
  return (
    <Modal onClose={onCancel}>
      <div className="modal-content">
        <h2>{title}</h2>
        <hr />
        <p>{message}</p>
      </div>

      <div className="modal-actions">
        <Button variant="secondary" onClick={onCancel}>
          {cancelLabel}
        </Button>
        
        <Button onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </Modal>
  );
}