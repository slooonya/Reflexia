import { Link, useParams } from 'react-router';
import './ChatSummary.css';

export function ChatSummary({ summary }) {
  const { type, id } = useParams(); 

  return (
    <div className="chat-summary">
      <p>
        { summary }
      </p>

      <div className="session-btns">
        <Link to="/chat" className="session-btn">Chat</Link>
        <Link to={`/details/${type}/${id}`} className="session-btn">Complete Session</Link>
      </div>
    </div>
  );
}