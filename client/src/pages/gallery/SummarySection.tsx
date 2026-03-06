import ReactMarkdown from 'react-markdown';

import EmptyImg from '../../assets/images/empty.svg';
import './SummarySection.css';

export function SummarySection({ summary }) {
  if (summary) {
    return (
      <div className="summary-container">
        <h1>Summary</h1>
        <hr />

        <div className="summary-content">
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>
    );
  } else {
    return (
      <div className="empty-state">
        <img src={EmptyImg} className="empty-icon" />
        <h2 className={`title-primary`}>No reflection summary</h2>
        <p>You haven't completed a reflection session.</p>
      </div>
    );
  }
}