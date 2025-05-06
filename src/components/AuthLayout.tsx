
import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  footer?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title, 
  subtitle,
  footer
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm bg-black rounded-2xl overflow-hidden border border-poker-darkGold/30 shadow-lg shadow-poker-gold/10">
        <div className="flex flex-col items-center p-6 space-y-6">
          <Link to="/">
            <Logo size="md" />
          </Link>
          
          <h1 className="text-xl font-bold text-poker-gold mt-2">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-sm text-gray-400">{subtitle}</p>
          )}
          
          <div className="w-full space-y-4">
            {children}
          </div>
          
          {footer && (
            <div className="pt-4 w-full text-center border-t border-gray-800">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
