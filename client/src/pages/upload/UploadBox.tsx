import UploadIcon from "../../assets/icons/upload-icon.svg?react";
import './UploadBox.css';

export function UploadBox({ onSuccess }) {
  async function onChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    onSuccess?.(file);
  }

  return (
    <div className="upload-box">
      <label htmlFor="upload">
        <input type="file" id="upload" accept=".json" onChange={onChange} />
        <UploadIcon className="upload-icon" />
        <span>Select a file to upload</span>
        <small>Supported format: .json</small>
      </label>
    </div>
  );
}