import React, { useState, useEffect } from 'react';
import { Download, Github, Linkedin, Mail, MapPin, Calendar, Code, Database, Cloud, Brain } from 'lucide-react';
import profileimg from '../assets/rounak.jpg';
export const Hero: React.FC = () => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const texts = ['DevOps', 'Cloud', 'AI/ML', 'Full Stack Developer'];
  
  useEffect(() => {
    const currentWord = texts[currentIndex];
    
    if (isTyping) {
      if (currentText.length < currentWord.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentWord.slice(0, currentText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 2000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setCurrentIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }
    }
  }, [currentText, currentIndex, isTyping, texts]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-purple-900 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Minimal Futuristic Diagonal Lines Background */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Diagonal lines radiating from bottom-right */}
        {Array.from({ length: 14 }).map((_, i) => {
          const angle = 210 + i * 8; // degrees, spread lines
          const length = 1200 + i * 80;
          const opacity = 0.18 - i * 0.01;
          const blur = i < 4 ? 2 : 0;
          // Convert angle to radians
          const rad = (angle * Math.PI) / 180;
          // Start at bottom-right
          const x1 = 1440;
          const y1 = 900;
          // End point
          const x2 = 1440 - Math.cos(rad) * length;
          const y2 = 900 - Math.sin(rad) * length;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={i % 3 === 0 ? '#e5e7eb' : '#fff'}
              strokeWidth={i % 4 === 0 ? 2 : 1}
              opacity={opacity}
              style={{ filter: blur ? `blur(${blur}px)` : undefined } as React.CSSProperties}
            />
          );
        })}
        {/* Optional: subtle arcs for extra techy feel */}
        {Array.from({ length: 3 }).map((_, i) => {
          const radius = 400 + i * 120;
          const opacity = 0.08 + i * 0.03;
          return (
            <path
              key={i}
              d={`M ${1440 - radius},900 Q 1440,${900 - radius} 1440,900`}
              stroke="#e5e7eb"
              strokeWidth="1"
              fill="none"
              opacity={opacity}
              style={{ filter: 'blur(1.5px)' } as React.CSSProperties}
            />
          );
        })}
      </svg>
      {/* Existing Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-10">
        {/* Floating Particles */}
        <div className="particles">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${Math.random() * 4 + 4}s`
              }}
            />
          ))}
        </div>
        
        {/* Floating Tech Icons */}
        <div className="absolute top-20 left-10 w-16 h-16 opacity-20 animate-bounce">
          <div className="w-full h-full bg-blue-500 rounded-lg rotate-45"></div>
        </div>
        <div className="absolute top-40 right-20 w-12 h-12 opacity-20 animate-pulse">
          <div className="w-full h-full bg-purple-500 rounded-full"></div>
        </div>
        <div className="absolute bottom-32 left-20 w-20 h-20 opacity-20 animate-bounce delay-1000">
          <div className="w-full h-full bg-emerald-500 rounded-lg rotate-12"></div>
        </div>
        <div className="absolute bottom-20 right-32 w-14 h-14 opacity-20 animate-pulse delay-500">
          <div className="w-full h-full bg-orange-500 rounded-lg rotate-45"></div>
        </div>
        
        {/* Hexagon Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="w-8 h-8 border border-gray-400 transform rotate-45"></div>
            ))}
          </div>
        </div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          
          {/* Left Column - Content */}
          <div className="text-center lg:text-left space-y-8 animate-fadeInUp">
            {/* Greeting */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                Available for opportunities
              </div>
              
              <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight">
                Hey, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  Aadiv Raj Pandey
                </span>
                <span className="wave inline-block ml-2 text-4xl">👋</span>
              </h1>
            </div>

            {/* Dynamic Role */}
            <div className="space-y-4">
              <div className="hero-subtitle text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300">
                <span className="text-blue-600 dark:text-blue-400">
                  {currentText}
                  <span className="animate-pulse text-purple-600">|</span>
                </span>
              </div>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl leading-relaxed">
                I love building{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">cloud-native solutions</span>,{' '}
                experimenting with{' '}
                <span className="font-semibold text-purple-600 dark:text-purple-400">ML pipelines</span>, and{' '}
                automating with{' '}
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">DevOps tools</span>.
              </p>
            </div>

            {/* Education & Location Info */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>7th Semester</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Sarala Birla University</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="/aadiv_resume.pdf"
                download
                className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg btn-hover"
              >
                <Download className="w-5 h-5 group-hover:animate-bounce" />
                📄 Download Resume
              </a>
              
              <a
                href="mailto:aadivrajpandey123@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                <Mail className="w-5 h-5" />
                💬 Contact Me
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/Aadiv27"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg tech-icon"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/aadiv-pandey-92a51b339"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-blue-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg tech-icon"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:aadivrajpandey123@gmail.com"
                className="p-3 bg-gray-100 dark:bg-gray-800 hover:bg-purple-600 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 hover:shadow-lg tech-icon"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Right Column - Profile Image */}
          <div className="flex justify-center lg:justify-end animate-fadeInUp">
            <div className="relative">
              {/* Animated Border Rings */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 animate-spin-slow opacity-75 blur-sm"></div>
              <div className="absolute inset-2 rounded-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 animate-spin-slow opacity-50 blur-md" style={{ animationDirection: 'reverse', animationDuration: '8s' }}></div>
              
              {/* Profile Image Container */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 p-4 shadow-2xl animate-glow">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center overflow-hidden animate-float">
                  {/* Profile Photo Placeholder - Replace with actual image */}
                  <img 
                    src={profileimg}
                    alt="Aadiv Raj Pandey" 
                    className="w-full h-full object-contain rounded-full bg-white"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.style.display = 'flex';
                    }}
                  />
                  <div className="w-full h-full bg-gradient-to-br from-blue-200 to-purple-200 dark:from-gray-500 dark:to-gray-600 rounded-full flex items-center justify-center" style={{ display: 'none' }}>
                    <div className="text-6xl md:text-8xl font-bold text-blue-600 dark:text-blue-400 opacity-50">
                      AP
                    </div>
                  </div>
                </div>
                
                {/* Floating Tech Icons around the image */}
                <div className="absolute -top-4 -right-4 w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-bounce">
                  <Code className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-bounce delay-500">
                  <Database className="w-6 h-6" />
                </div>
                <div className="absolute top-1/4 -left-6 w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-pulse">
                  <Cloud className="w-5 h-5" />
                </div>
                <div className="absolute top-3/4 -right-6 w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white shadow-lg animate-pulse delay-700">
                  <Brain className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};