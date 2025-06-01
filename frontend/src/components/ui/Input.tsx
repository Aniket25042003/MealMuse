import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={props.id}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-white border border-gray-200 rounded-lg px-4 py-2 w-full
              ${icon ? 'pl-10' : ''}
              focus:outline-none focus:ring-2 focus:ring-green-primary/50 focus:border-green-primary
              ${error ? 'border-coral focus:ring-coral/50 focus:border-coral' : ''}
              transition-all duration-200
              ${className}
            `}
            {...props}
          />
        </div>
        {error && <p className="mt-1 text-sm text-coral">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;