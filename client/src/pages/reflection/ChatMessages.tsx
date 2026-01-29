import { useEffect, useRef } from 'react';
import { ChatMessage } from './ChatMessage';
import './ChatMessages.css';

export function ChatMessages({ chatMessages }) {
  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const containerElem = chatMessagesRef.current;
    if (containerElem) {
      containerElem.scrollTop = containerElem.scrollHeight;
    }
  }, [chatMessages]);
  
  return (
    <div className="chat-messages" ref={chatMessagesRef}>
      {chatMessages.map(msg => (
        <ChatMessage key={msg.id} sender={msg.sender} message={msg.message}/>
      ))}
    </div>
  );
}