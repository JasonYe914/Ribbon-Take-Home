interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  id?: string;
  type?: string;
  placeholder?: string;
  hasError?: boolean;
  maxLength?: number;
  inputMode?: 'text' | 'numeric' | 'email';
  autoComplete?: string;
}

export default function Input({
  label,
  value,
  onChange,
  id,
  type = 'text',
  placeholder,
  hasError = false,
  maxLength,
  inputMode,
  autoComplete,
}: InputProps) {
  return (
    <div className="fg">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={hasError ? 'ef' : ''}
        maxLength={maxLength}
        inputMode={inputMode}
        autoComplete={autoComplete}
      />
    </div>
  );
}
