import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = '' }: CardProps) {
  return (
    <div className={`bg-white backdrop-blur-sm bg-opacity-95 rounded-xl shadow-lg 
      transition-all duration-300 hover:shadow-xl border border-gray-100 ${className}`}>
      {children}
    </div>
  );
}