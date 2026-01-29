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
        <li>{tips[1]}</li>
        <li>{tips[2]}</li>
        <li>{tips[3]}</li>
      </ul>
    </div>
  );
}