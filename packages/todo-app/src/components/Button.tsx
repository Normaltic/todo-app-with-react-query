import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger';
}

const variantClasses = {
  primary: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
  danger: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
};

function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseClasses = 'w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400';
  
  const combinedClasses = [
    baseClasses,
    variantClasses[variant],
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      {...props}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}

export default Button;