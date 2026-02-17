import './FormInput.css';

interface FormInputProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
  error?: string;
}

export function FormInput({ type, placeholder, value, onChange, onBlur, error }: FormInputProps) {
  return (
    <div className="field">
      <input type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)} 
             onBlur={onBlur} className={`input ${error ? "input-error" : ""}`} />
      {error && 
        <span className="field-error">{error}</span>
      }
    </div>
  );
}