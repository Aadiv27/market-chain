import React from 'react';
import { Award, Clock } from 'lucide-react';

export const Certifications: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Certifications
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Professional certifications and achievements
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Clock className="w-12 h-12" />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-4">Coming Soon</h3>
            <p className="text-lg mb-6">
              Currently working towards AWS, Docker, and Kubernetes certifications
            </p>
            
            <div className="flex justify-center gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">AWS Solutions Architect</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">Docker Certified</span>
              <span className="bg-white/20 px-3 py-1 rounded-full">CKA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};