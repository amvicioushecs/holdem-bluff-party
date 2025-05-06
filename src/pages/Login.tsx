
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signIn, user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signIn(email, password);
      // Navigation is handled by the auth state change in AuthContext
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
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
