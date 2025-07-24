import React from 'react';
import { Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold mb-2">Aadiv Raj Pandey</h3>
            <p className="text-gray-400">DevOps & Cloud Enthusiast</p>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <p className="flex items-center justify-center gap-2 text-gray-400">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Aadiv Raj Pandey
            </p>
            <p className="text-gray-500 mt-2">
              © 2024 All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};