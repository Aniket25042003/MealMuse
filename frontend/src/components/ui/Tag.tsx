import React from 'react';
import { X } from 'lucide-react';

interface TagProps {
  label: string;
  onRemove?: () => void;
  className?: string;
  color?: 'green' | 'coral' | 'gray';
}

const Tag: React.FC<TagProps> = ({
  label,
  onRemove,
  className = '',
  color = 'green',
}) => {
  const colorClasses = {
    green: 'bg-green-primary/20 text-gray-800',
    coral: 'bg-coral/20 text-coral',
    gray: 'bg-gray-200 text-gray-700',
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClasses[color]} ${className}`}
    >
      {label}
      {onRemove && (
        <button
          type="button"
          className="ml-1 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center focus:outline-none focus:text-gray-500 hover:text-gray-700"
          onClick={onRemove}
        >
          <X size={14} />
        </button>
      )}
    </span>
  );
};

export default Tag;