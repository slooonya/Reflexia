import { useState } from 'react';
import BotImage from '../../assets/icons/bot-icon.svg';
import ExpandIcon from '../../assets/icons/expand-icon.svg';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = message.length > 160;

  return (
    <div className={`chat-message ${sender}`}>
      {sender === "bot" && (
        <img src={BotImage}  className="chat-message-profile" />
      )}

      <div className="chat-bubble">
        <p className={expanded ? "expanded" : "collapsed"}>
          {message}
        </p>

        {isLong && (
          <button className={`expand-btn ${expanded ? "expanded" : "collapsed"}`} onClick={() => setExpanded(e => !e)}>
            <img src={ExpandIcon} />
          </button>
        )}
      </div>
    </div>
  );
}