import { useParams } from 'react-router';
import ReactMarkdown from 'react-markdown';
import { Button } from '../../components/Button';

import './ChatSummary.css';

export function ChatSummary({ summary }) {
  const { type, id } = useParams(); 

  return (
    <div className="chat-summary">
      <div className="chat-summary-content">
        <ReactMarkdown>{ summary }</ReactMarkdown>
      </div>

      <div className="session-btns">
        <Button to={`/details/${type}/${id}`}>Complete Session</Button>
      </div>
    </div>
  );
}