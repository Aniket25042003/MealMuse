import { CSSProperties } from 'react';

export const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { 
    duration: 0.3, 
    ease: "easeInOut" 
  }
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { 
    duration: 0.2,
    ease: "easeInOut" 
  }
};

export const slideIn = {
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 20, opacity: 0 },
  transition: { 
    duration: 0.3,
    ease: "easeInOut" 
  }
};

export const scaleIn = {
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.95, opacity: 0 },
  transition: { 
    duration: 0.3,
    ease: "easeInOut" 
  }
};

export const floatingAnimation: CSSProperties = {
  animation: 'floating 3s ease-in-out infinite'
};

export const pulseAnimation: CSSProperties = {
  animation: 'pulse 2s ease-in-out infinite'
};

export const shimmerAnimation: CSSProperties = {
  animation: 'shimmer 1.5s linear infinite'
};