import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import BotImage from '../../assets/icons/bot-icon.svg';
import ExpandIcon from '../../assets/icons/expand-icon.svg?react';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
  const [expanded, setExpanded] = useState(false);

  const text = message ?? "";
  const isLong = sender === "user" && text.length > 50;

   return (
    <div className={`chat-message ${sender}`}>
      {sender === "system" && (
        <img src={BotImage} className="chat-message-profile" />
      )}

      <div className="chat-bubble">
        <div className="chat-text" style={ isLong ? { maxHeight: expanded ? "1000px" : "6em" } : undefined }>
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>

        {isLong && (
          <button className={`expand-btn ${expanded ? "expanded" : ""}`} onClick={() => setExpanded(e => !e)} >
            <ExpandIcon className='expand-icon' />
          </button>
        )}
      </div>
    </div>
  );
}