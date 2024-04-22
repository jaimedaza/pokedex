// Input.tsx
import React from "react";

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

const Input = ({ type, placeholder, value, onChange }: InputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
};

export default Input;
