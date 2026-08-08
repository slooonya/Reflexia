import { useState, useRef } from "react";

import SendIcon from '../assets/icons/send-icon.svg?react';
import './PromptInput.css';

export function PromptInput({ placeholder, onSubmit, disabled }) {
  const [inputText, setInputText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function submit() {
    if (!inputText.trim()) return;
    onSubmit(inputText.trim());
    setInputText("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      submit();
    }
  }

  function saveInputText(event) {
    setInputText(event.target.value);
    
    const textarea = textareaRef.current;
    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 140) + "px";
  }

  return (
    <div className="prompt-input">
      <textarea placeholder={placeholder} value={inputText} onChange={saveInputText} 
                onKeyDown={handleKeyDown} ref={textareaRef} rows={1} />

      <button disabled={disabled} onClick={submit}>
        <SendIcon className="send-icon" />
      </button>
    </div>
  );
}