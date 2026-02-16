import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

import BotImage from '../../assets/icons/bot-icon.svg';
import ExpandIconWhite from '../../assets/icons/expand-icon.svg';
import ExpandIconBlack from '../../assets/icons/expand-icon-black.svg';
import './ChatMessage.css';

export function ChatMessage({ message, sender }) {
  const [expanded, setExpanded] = useState(false);
  const text = message ?? "";
  const isLong = text.length > 160;

  return (
    <div className={`chat-message ${sender}`}>
      {sender === "system" && (
        <img src={BotImage}  className="chat-message-profile" />
      )}

      <div className="chat-bubble">
        <div className={expanded ? "expanded" : "collapsed"}>
          <ReactMarkdown>
            {text}
          </ReactMarkdown>
        </div>

        {isLong && (
          <button className={`expand-btn ${expanded ? "expanded" : "collapsed"}`} onClick={() => setExpanded(e => !e)}>
             {sender === "system" && (
              <img src={ExpandIconBlack} />
             )}

             {sender === "user" && (
              <img src={ExpandIconWhite} />
             )}
          </button>
        )}
      </div>
    </div>
  );
}