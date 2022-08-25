import * as React from "react";

type InputProps = {
  name: string;
  value: string;
  placeholder?: string;
  handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void;
  type: string;
  autoFocus?: boolean;
  disabled?: boolean;
};

export function Input({
  value,
  name,
  placeholder,
  handleInputChange,
  type,
  autoFocus,
  disabled,
}: InputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputRef.current) {
      const ref = inputRef.current;
      if (autoFocus) {
        ref.focus();
      }
    }
  }, [inputRef, autoFocus]);

  return (
    <input
      type={type}
      ref={inputRef}
      name={name}
      id={name}
      disabled={disabled}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={(e) => handleInputChange(e)}
    />
  );
}
