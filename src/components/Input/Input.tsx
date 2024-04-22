import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
}

const Input = ({ type, placeholder, value, onChange, onFocus }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      className="border py-2 px-1 rounded border-yellow-400 w-full"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={onFocus}
    />
  );
};

export default Input;
