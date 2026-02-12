import { useUpload } from "../../hooks/useUpload";

import UploadIcon from "../../assets/icons/upload-icon-brown.svg";
import './UploadBox.css';

export function UploadBox() {
  const { start } = useUpload();

  function onChange(e) {
    const file = e.target.files?.[0];
    if (file) start(file);
  }

  return (
    <div className="upload-box">
      <label htmlFor="upload">
        <input type="file" id="upload" accept=".json" onChange={onChange} />
        <img src={UploadIcon} />
        <span>Select a file to upload</span>
        <small>Supported format: .json</small>
      </label>
    </div>
  );
}