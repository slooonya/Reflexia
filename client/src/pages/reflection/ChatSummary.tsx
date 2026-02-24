import ReactMarkdown from 'react-markdown';
import { useNavigate, useParams } from 'react-router';
import { Button } from '../../components/Button';

import './ChatSummary.css';

export function ChatSummary({ summary }) {
  const { type, id } = useParams(); 
  const navigate = useNavigate();

  return (
    <div className="chat-summary">
      <div className="chat-summary-content">
        <ReactMarkdown>{ summary }</ReactMarkdown>
      </div>

      <div className="session-btns">
        <Button onClick={() => navigate(`/details/${type}/${id}`, { state: { sessionComplete: true} })}>Complete Session</Button>
      </div>
    </div>
  );
}