"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User } from 'lucide-react';
import { Toaster } from 'sonner';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Animation Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        {/* Framer Motion Animation Section */}
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <motion.div
            className="space-y-8 text-white z-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-5xl font-bold"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              Welcome to Your Platform
            </motion.h1>
            <motion.p
              className="text-xl text-white/90"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            >
              Secure, fast, and reliable authentication for your business needs.
            </motion.p>
            {/* Animated Icons with Floating Effect */}
            <motion.div
              className="flex gap-6 mt-12"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            >
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              >
                <Lock className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
              >
                <Mail className="w-8 h-8 text-white" />
              </motion.div>
              <motion.div
                className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center"
                animate={{ y: [0, -20, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1 }}
              >
                <User className="w-8 h-8 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
          {/* Geometric Shapes with Pulse Effect */}
          <motion.div
            className="absolute top-20 right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 2 }}
          />
        </div>
      </div>

      {/* Right Side - Content (Login/Signup Form) */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        {children}
        <Toaster/>
      </div>
    </div>
  );
}