
import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'w-32',
    md: 'w-40',
    lg: 'w-52'
  };

  return (
    <div className={`relative ${sizeClasses[size]} ${className}`}>
      <img 
        src="/lovable-uploads/c5528f00-41ad-4b04-aa93-d939fafa3721.png" 
        alt="Hold'em or Fold'em Poker" 
        className="w-full h-auto object-contain"
      />
    </div>
  );
};

export default Logo;
