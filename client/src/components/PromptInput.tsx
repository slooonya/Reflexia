import { useState } from "react";
import './PromptInput.css';

export function PromptInput({ placeholder, onSubmit, buttonLabel = "Send" }) {
  const [inputText, setInputText] = useState("");

  function submit() {
    if (!inputText.trim()) return;
    onSubmit(inputText.trim());
    setInputText("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      submit();
    }
  }

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  return (
    <div className="prompt-input">
      <textarea placeholder={placeholder} value={inputText} onChange={saveInputText} onKeyDown={handleKeyDown}/>
      <button onClick={submit}>{buttonLabel}</button>
    </div>
  );
}