import './ProgressBar.css';

export function ProgressBar({ progress }) {
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${progress * 100}%` }}></div>
    </div>
  );
}