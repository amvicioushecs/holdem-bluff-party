
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import AuthLayout from '@/components/AuthLayout';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login for now
    setTimeout(() => {
      toast({
        title: "Login successful",
        description: "Welcome back to Hold'em or Fold'em Poker!"
      });
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <AuthLayout 
      title="Welcome Back!"
      footer={
        <div className="text-sm">
          <span className="text-gray-400">Don't have an account? </span>
          <Link to="/register" className="text-poker-gold hover:underline">
            Register now
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-300">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            className="poker-input"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="text-sm text-gray-300">Password</label>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="poker-input"
          />
        </div>

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-poker-gold">
            Forgot your password?
          </Link>
        </div>
        
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-poker-gold hover:bg-poker-darkGold text-black font-bold py-2 rounded-full"
        >
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </form>
    </AuthLayout>
  );
};

export default Login;
