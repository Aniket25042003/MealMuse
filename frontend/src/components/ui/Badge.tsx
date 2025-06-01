import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  color?: 'green' | 'coral' | 'gray' | 'blue';
  className?: string;
}

const Badge: React.FC<BadgeProps> = ({
  children,
  color = 'green',
  className = '',
}) => {
  const colorClasses = {
    green: 'bg-green-primary/20 text-green-dark',
    coral: 'bg-coral/20 text-coral',
    gray: 'bg-gray-200 text-gray-700',
    blue: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;