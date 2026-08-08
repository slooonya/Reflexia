import { useEffect } from 'react';
import { createPortal } from "react-dom";

import './ImageOverlay.css';
import CloseIcon from "../assets/icons/close-icon.svg?react";

export function ImageOverlay({ img, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return createPortal(
    <div className="image-overlay" onClick={onClose}>
      <CloseIcon className="close-icon" onClick={onClose} />
      <img src={img} className="fullscreen-image" onClick={(e) => e.stopPropagation()} />
    </div>,
    document.body
  );
}