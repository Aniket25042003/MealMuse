import React, { forwardRef } from 'react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  className?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`
              h-5 w-5 rounded border-gray-300 text-green-primary 
              focus:ring-green-primary/30 transition-colors duration-200
              ${className}
            `}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label
              htmlFor={props.id}
              className={`font-medium ${
                props.disabled ? 'text-gray-400' : 'text-gray-700'
              }`}
            >
              {label}
            </label>
            {error && <p className="mt-1 text-sm text-coral">{error}</p>}
          </div>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';

export default Checkbox;