import './SettingRow.css';

export function SettingRow({title, description, children}) {
  return (
    <div className="setting-row">
      <div className="setting-row-info">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="setting-control">
        {children}
      </div>
    </div>
  );
}