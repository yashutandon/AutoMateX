"use client";

import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Mail, Lock, Github } from 'lucide-react';
import { authClient } from '@/lib/auth-client';
import { toast } from 'sonner';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email:string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    console.log("handleSubmit called");
    if (e) e.preventDefault();
    const newErrors = { email: '', password: '' };

    // Sanitize input
    const safeEmail = DOMPurify.sanitize(email);
    const safePassword = DOMPurify.sanitize(password);

    if (!safeEmail) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(safeEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!safePassword) {
      newErrors.password = 'Password is required';
    } else if (safePassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.password) {
      setIsLoading(true);
      
      await authClient.signIn.email({
        email: safeEmail,
        password: safePassword,
        callbackURL:"/"
      },{
        onSuccess: () => { 
          toast.success('Logged in successfully!');
        },
        onError: (error) => {
          toast.error(`Login failed: ${error.error.message}`);
        }
      })
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <form
      className="w-full max-w-md mx-auto px-4 sm:px-0"
      onSubmit={handleSubmit}
      autoComplete="on"
      aria-label="Login form"
    >
      <Card className="shadow-2xl border-0">
        <CardHeader className="space-y-1 text-center pb-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mb-2">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-base text-gray-600">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="space-y-5">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-label="Email address"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className={`pl-10 h-12 border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500`}
                  required
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500" role="alert">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  aria-label="Password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className={`pl-10 pr-10 h-12 border-2 ${errors.password ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  tabIndex={0}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500" role="alert">{errors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-base shadow-lg"
              aria-busy={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </div>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="h-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-medium flex items-center justify-center"
              aria-label="Sign in with GitHub"
            >
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={isLoading}
              className="h-12 border-2 border-gray-200 hover:bg-gray-50 hover:border-gray-300 font-medium flex items-center justify-center"
              aria-label="Sign in with Google"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </Button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-blue-600 hover:text-blue-700 font-semibold">
                Sign up
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-8">
        © 2025 Your Company. All rights reserved.
      </p>
    </form>
  );
}