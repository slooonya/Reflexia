import { useState } from 'react';
import './ChatInput.css';

export function ChatInput({ placeholder, chatMessages, setChatMessages, setHasStarted }) {
  const [inputText, setInputText] = useState("");

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      sendMessage();
    }
  }

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function sendMessage() {
    if (!inputText.trim()) return;

    setHasStarted(true);

    const newChatMessages = [
      ...chatMessages,
      {
        id: crypto.randomUUID(),
        sender: "user",
        message: inputText
      }
    ];
    
    setChatMessages(newChatMessages);

    setChatMessages([
      ...newChatMessages,
      {
        id: crypto.randomUUID(),
        sender: "bot",
        message: "beep boop"
      }
    ]);

    setInputText("");
  }

  return (
    <div className="chat-input">
      <textarea placeholder={placeholder} value={inputText} onChange={saveInputText} onKeyDown={handleKeyDown}/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}