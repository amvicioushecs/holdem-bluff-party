
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-32',
    md: 'w-40',
    lg: 'w-52',
  };
  
  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img 
        src="/lovable-uploads/75215ac7-579d-4d6b-9553-a769f4c907fd.png" 
        alt="Hold'em or Fold'em Poker Logo" 
        className="w-full h-auto drop-shadow-lg"
      />
    </div>
  );
};

export default Logo;
