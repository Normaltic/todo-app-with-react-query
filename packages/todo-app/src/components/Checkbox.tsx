import React from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function Checkbox({ id, label, ...props }: CheckboxProps) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={id}
        {...props}
        className="mr-2"
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
