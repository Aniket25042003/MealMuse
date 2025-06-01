import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = false,
}) => {
  const baseClasses = 'bg-white rounded-xl shadow-sm p-4 md:p-6 transition-all duration-200';
  const hoverClasses = hoverable ? 'cursor-pointer hover:shadow-md transform hover:translate-y-[-2px]' : '';
  const borderClasses = bordered ? 'border border-gray-200' : '';
  
  return (
    <motion.div
      className={`${baseClasses} ${hoverClasses} ${borderClasses} ${className}`}
      onClick={onClick}
      whileHover={hoverable ? { y: -2, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default Card;