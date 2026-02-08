import { useParams } from 'react-router';
import { Button } from '../../components/Button';

import './ChatSummary.css';

export function ChatSummary({ summary }) {
  const { type, id } = useParams(); 

  return (
    <div className="chat-summary">
      <p>{ summary }</p>

      <div className="session-btns">
        <Button to="/chat">Chat</Button>
        <Button to={`/details/${type}/${id}`}>Complete Session</Button>
      </div>
    </div>
  );
}