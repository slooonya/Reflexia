import './InlineLoader.css';

export function InlineLoader({ label = "Generating summary..." }) {
  return (
    <div className="inline-loader">
      <div className="loader small"></div>
      <p>{label}</p>
    </div>
  );
}