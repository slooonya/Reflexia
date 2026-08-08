import { useState } from "react";
import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";

import './ProcessingConfigModal.css';

export function ProcessingConfigModal({open, onStart, onCancel}) {
  const [weeks, setWeeks] = useState(6);
  const [months, setMonths] = useState(6);

  const weekOptions = Array.from(
    { length: 52 },
    (_, i) => i + 1
  );

  const monthOptions = Array.from(
    { length: 12 },
    (_, i) => i + 1
  );

  if (!open) return null;

  return (
    <Modal onClose={onCancel}>
      <div className="modal-content">
        <h2>How far back should we look?</h2>
        <hr />
        <p>
          Choose how much of your watch history you'd like
          to be analyzed.
        </p>

        <div className="processing-options">
          <label>
            <span><b>Weeks:</b></span>

            <select value={weeks} onChange={(e) => setWeeks(Number(e.target.value))}>
              <option value={0}>None</option>

              {weekOptions.map((week) => (
                <option key={week} value={week}>
                  {week}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span><b>Months:</b></span>

            <select value={months} onChange={(e) => setMonths(Number(e.target.value))}>
              <option value={0}>None</option>

              {monthOptions.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="modal-actions">
        <Button
          variant="primary"
          onClick={() => onStart({ weeks, months })}
          disabled={weeks === 0 && months === 0}
        >
          Start Processing
        </Button>
      </div>
    </Modal>
  );
}