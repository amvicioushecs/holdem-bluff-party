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
  return <div className={`relative ${sizeClasses[size]} ${className}`}>
      
    </div>;
};
export default Logo;