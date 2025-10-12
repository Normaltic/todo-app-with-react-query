import React from "react";

interface ToggleSwitchProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export default function ToggleSwitch({
  id,
  checked,
  onChange,
  label,
  disabled,
  ...props
}: ToggleSwitchProps) {
  return (
    <label
      htmlFor={id}
      className={`flex items-center ${
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      }`}
    >
      <span className="mr-3 text-sm font-medium text-gray-900">{label}</span>
      <div className="relative">
        <input
          type="checkbox"
          id={id}
          className="sr-only"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          {...props}
        />
        <div
          className={`block w-10 h-6 rounded-full transition ${
            checked ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></div>
        <div
          className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
            checked ? "transform translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  );
}
