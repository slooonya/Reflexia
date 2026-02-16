import './ChatIntro.css'

export function ChatIntro({ prompt, tips }) {
  return (
    <div className="chat-intro">
      <hr />
      <p className="prompt">
        {prompt}
      </p>
      <hr />

      <h1 className='tips-heading'>Tips:</h1>
      <ul className="tips">
        {tips.map((tip, i) => (
          <li key={i}>
            <span className="tip-title">{tip.title}: </span>
            <span className="tip-text">{tip.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}