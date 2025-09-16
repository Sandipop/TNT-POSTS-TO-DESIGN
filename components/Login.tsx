import React, { useState } from 'react';
import Icon from './Icon';

interface LoginProps {
  onLogin: (email: string) => void;
}

const logoBase64 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA+gAAABQCAYAAAC04r+rAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAYbSURBVHgB7d2tVdswFAXQzYAGYARGoARGoARGEAagBEagBEagBEagBEbABoygDej+V3ccQJLz5JKzc13f09VbS3K35N45SgghpEeybUncb6vPj9P3CCHEe5O2JDt+L8t/T3b+nBBC3L+kLUnO/Y9s/jkhhLgDkpYk535s87WEEOLekrYk5X4gO9WEEEJuStqSlPvhbI8QQkibkpYk5T4wGyOEEEKakbQkKfWBsQlCCCFNSdqSlPrAZoYQQpSSNCUp9YHTHEIIUUrSkqT0wNmcIYSQIkxaklIDM7sSQghRYtKSVGaGzhBCiBKTlqQyM3SGEOF9SVsq1dnpk8vldrvdXq/X+/3+mUwmk8vlTCbT7/fPZrPxeLzZbHa73W632+12pVLp9/vNZrPZbJbL5XK5nEwmk8lkMplMJpPJJxaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaLxWKxWCwWi8VisVgsFovFYrFYLBaE2JB0JO35cR6EEELcj7Ql6T4/ziOEEOL+JW1J+paf5xJCCPETkpYk/fLTfCSEEEJMSFqS9MtP8ykhhBAjkvYk/fJT/JgQQgijSXuSfvlpXhJCiGFJe5K+gZ/nEUIIUX/S/hEAAAAvSURBVAYnCQ+5A4kAAAAASUVORK5CYII=';

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (password.trim().length < 6) {
        setError('Password must be at least 6 characters.');
        return;
    }
    setError('');
    // In a real app, you would have different logic for login vs signup
    onLogin(email);
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError('');
    setEmail('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl px-8 pt-6 pb-8 mb-4 border border-gray-200">
            <div className="mb-6 text-center">
                <img src={logoBase64} alt="Tagntarget Logo" className="h-10 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-gray-800">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
                <p className="text-gray-500">{isLogin ? 'Sign in to visualize your posts' : 'Get started with your free account'}</p>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                    Email Address
                </label>
                <input
                    className={`shadow-sm appearance-none border ${error.includes('email') ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`}
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-describedby="email-error"
                />
            </div>
             <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className={`shadow-sm appearance-none border ${error.includes('Password') ? 'border-red-500' : 'border-gray-300'} rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow`}
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                 {error && <p id="form-error" className="text-red-500 text-xs italic mt-2">{error}</p>}
            </div>
            <div className="mb-6">
                <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
                    type="submit"
                >
                    {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
            </div>
            
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">OR</span>
                </div>
            </div>
            
            <div className="space-y-3">
                <button type="button" className="w-full flex items-center justify-center gap-3 text-gray-700 font-semibold py-2.5 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors">
                    <Icon name="google" className="h-5 w-5"/>
                    Continue with Google
                </button>
            </div>
            
             <p className="text-center text-sm text-gray-500 mt-6">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button type="button" onClick={toggleAuthMode} className="font-semibold text-blue-600 hover:text-blue-500 ml-1">
                    {isLogin ? 'Sign up' : 'Sign in'}
                </button>
            </p>
        </form>
        <p className="text-center text-gray-500 text-xs">
            &copy;{new Date().getFullYear()} Tagntarget. All rights reserved.
        </p>
    </div>
  );
};

export default Login;