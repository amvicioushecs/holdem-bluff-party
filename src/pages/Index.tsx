
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  React.useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-black to-gray-900">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center animate-card-float">
          <Logo size="lg" />
        </div>
        
        {/* Tagline */}
        <h1 className="text-3xl font-bold gold-gradient">
          Hold'em or Fold'em
        </h1>
        <p className="text-gray-400">
          The ultimate poker experience
        </p>
        
        {/* Action buttons */}
        <div className="pt-8 space-y-4">
          <Button 
            onClick={() => navigate('/register')}
            className="w-full bg-poker-gold hover:bg-poker-darkGold text-black font-bold py-6 rounded-full"
          >
            Get Started
          </Button>
          
          <Button 
            onClick={() => navigate('/login')}
            variant="outline" 
            className="w-full border-poker-gold text-poker-gold hover:bg-poker-gold/10 font-bold py-6 rounded-full"
          >
            I Already Have an Account
          </Button>
        </div>
        
        {/* Footer */}
        <div className="pt-8">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Hold'em or Fold'em Poker. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
