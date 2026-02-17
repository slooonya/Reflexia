import './InlineLoader.css';

export function InlineLoader({ label }) {
  return (
    <div className="inline-loader">
      <div className="loader small"></div>
      <p>{label}</p>
    </div>
  );
}