import { useNavigate } from "react-router";
import { uploadWatchHistory } from "../../api/upload";

import UploadIcon from "../../assets/icons/upload-icon-brown.svg";
import './UploadBox.css';

export function UploadBox() {
  const navigate = useNavigate();

  async function handleUpload(file: File) {
    await uploadWatchHistory(file);
    navigate("/gallery");
  }

  return (
    <div className="upload-box">
      <label htmlFor="upload">
        <input type="file" id="upload" accept=".json" 
               onChange={(e) => {const file = e.target.files?.[0]; if (file) handleUpload(file);}} 
        />
        <img src={UploadIcon} />
        <span>Select a file to upload</span>
        <small>Supported format: .json</small>
      </label>
    </div>
  );
}