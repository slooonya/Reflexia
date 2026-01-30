import './Toggle.css';

export function Toggle({ options, active, onChange, variant = "default" }) {
  const activeIdx = options.findIndex(option => option === active);

  return (
    <div className={`toggle toggle-${variant}`}>
      {options.map(option => (
        <button key={option} className={option === active ? "active" : ""} onClick={() => onChange(option)}>
          {option}
        </button>
      ))}

      <div className="toggle-slider" style={{ transform: `translateX(${activeIdx * 95}%)` }} />
    </div>
  );
}