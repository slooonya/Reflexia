import UploadIcon from "../../assets/icons/upload-icon-brown.svg";
import './UploadBox.css';

export function UploadBox() {
  return (
    <div className="upload-box">
      <label htmlFor="upload">
        <input type="file" id="upload" accept=".json"/>
        <img src={UploadIcon} />
        <span>Select a file to upload</span>
        <small>Supported format: .json</small>
      </label>
    </div>
  );
}