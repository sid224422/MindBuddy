import React from 'react';
import { Link } from 'react-router-dom';
import { ChatBot } from '../components/ChatBot';
import { ArrowLeft } from 'lucide-react';

export const Chat = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-light-green to-light-orange">
      <div className="container mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-dark-green hover:text-dark-green/80 mb-6 p-4"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Link>
        <ChatBot />
      </div>
    </div>
  );
};