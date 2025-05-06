
import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/components/AuthLayout';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, user } = useAuth();
  
  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await signUp(email, password, firstName, lastName);
      // We don't navigate here because signUp shows a success message
      // and we expect the user to verify their email first
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Register now"
      footer={
        <div className="text-sm">
          <span className="text-gray-400">Already have an account? </span>
          <Link to="/login" className="text-poker-gold hover:underline">
            Login
          </Link>
        </div>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="text-sm text-gray-300">First Name *</label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              required
              className="poker-input"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="text-sm text-gray-300">Last Name *</label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              required
              className="poker-input"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm text-gray-300">Email address *</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            required
            className="poker-input"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm text-gray-300">Password *</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="poker-input"
          />
        </div>
        
        <div className="pt-2">
          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-poker-gold hover:bg-poker-darkGold text-black font-bold py-2 rounded-full"
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </div>
        
        <p className="text-xs text-gray-500 text-center">
          By registering, you agree to our Terms of Service and Privacy Policy
        </p>
      </form>
    </AuthLayout>
  );
};

export default Register;
