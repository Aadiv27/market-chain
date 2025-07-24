import React, { useState, useEffect } from 'react';
import { GraduationCap, Briefcase, Target, Star, Calendar, MapPin, Award } from 'lucide-react';

interface TimelineItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  type: 'education' | 'experience' | 'goal' | 'achievement';
  techStack?: string[];
  achievements?: string[];
  isVisible?: boolean;
}

export const Timeline: React.FC = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const timelineItems: TimelineItem[] = [
    {
      id: 1,
      icon: <GraduationCap className="w-6 h-6" />,
      title: 'Started Computer Science Journey',
      subtitle: 'Sarala Birla University',
      period: '2022',
      description: 'Began my Bachelor of Technology in Computer Science, laying the foundation for my technical career with core programming and mathematics courses.',
      type: 'education',
      techStack: ['C++', 'Python', 'Data Structures', 'Algorithms'],
      achievements: ['Dean\'s List', 'Programming Club Member']
    },
  
    {
      id: 3,
      icon: <Briefcase className="w-6 h-6" />,
      title: 'DevOps & Cloud Journey Begins',
      subtitle: 'Self-Learning & Projects',
      period: '2023',
      description: 'Discovered my passion for DevOps and cloud technologies. Started building containerized applications and learning infrastructure as code.',
      type: 'achievement',
      techStack: ['Docker', 'AWS', 'Jenkins', 'Linux', 'Git'],
      achievements: ['5+ Docker projects', 'AWS fundamentals certified']
    },
    {
      id: 4,
      icon: <Briefcase className="w-6 h-6" />,
      title: 'Multi-Technology Intern',
      subtitle: 'Linux World Pvt. Ltd',
      period: 'Jun – Aug 2025',
      description: 'Gained comprehensive hands-on experience across multiple cutting-edge technologies including cloud computing, AI/ML, and modern web development frameworks.',
      type: 'experience',
      techStack: ['Python', 'ML', 'Deep Learning', 'AWS', 'DevOps', 'Generative AI', 'DBMS', 'Web Development'],
      achievements: ['Led 3 intern projects', 'Mentored junior interns', '95% performance rating']
    },
    {
      id: 5,
      icon: <Star className="w-6 h-6" />,
      title: 'Advanced Projects Portfolio',
      subtitle: 'Multiple Domains',
      period: 'Ongoing',
      description: 'Developed sophisticated projects spanning automation, AI, and full-stack development, including JobTrackerAI and automated CI/CD systems.',
      type: 'achievement',
      techStack: ['React', 'Node.js', 'Docker', 'Kubernetes', 'Streamlit', 'Generative AI'],
      achievements: ['10+ production projects', 'Open source contributions', 'Tech blog articles']
    },
    {
      id: 6,
      icon: <Target className="w-6 h-6" />,
      title: 'Cloud-Native DevOps Mastery',
      subtitle: 'Future Goals',
      period: 'Ongoing',
      description: 'Focusing on mastering advanced cloud-native technologies, contributing to open source AI Ops tools, and building scalable distributed systems.',
      type: 'goal',
      techStack: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Service Mesh'],
      achievements: ['Target: AWS Solutions Architect', 'Open source maintainer', 'Tech conference speaker']
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.getAttribute('data-id') || '0');
            setVisibleItems(prev => [...prev, id]);
          }
        });
      },
      { threshold: 0.3 }
    );

    const timelineElements = document.querySelectorAll('.timeline-item');
    timelineElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'education': return 'from-blue-500 to-blue-600';
      case 'experience': return 'from-purple-500 to-purple-600';
      case 'achievement': return 'from-emerald-500 to-emerald-600';
      case 'goal': return 'from-orange-500 to-orange-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'education': return '🎓';
      case 'experience': return '💼';
      case 'achievement': return '⭐';
      case 'goal': return '🎯';
      default: return '📍';
    }
  };

  return (
    <section id="journey" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Journey
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From curious student to DevOps enthusiast - a timeline of growth, learning, and achievements
          </p>
        </div>

        <div className="max-w-6xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-emerald-500 transform md:-translate-x-1/2 rounded-full"></div>

          {timelineItems.map((item, index) => (
            <div
              key={item.id}
              data-id={item.id}
              className={`timeline-item relative flex items-center mb-16 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Timeline Dot */}
              <div className={`absolute left-8 md:left-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${getTypeColor(item.type)} transform md:-translate-x-1/2 flex items-center justify-center text-white shadow-lg z-10 transition-all duration-500 ${
                visibleItems.includes(item.id) ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
              }`}>
                {item.icon}
              </div>

              {/* Content Card */}
              <div className={`ml-24 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
              }`}>
                <div className={`bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform ${
                  visibleItems.includes(item.id) 
                    ? 'translate-y-0 opacity-100' 
                    : index % 2 === 0 
                      ? 'translate-x-8 opacity-0' 
                      : '-translate-x-8 opacity-0'
                } border border-gray-100 dark:border-gray-700 hover:scale-105`}>
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{getTypeIcon(item.type)}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {item.subtitle}
                      </h4>
                    </div>
                    <div className="flex items-center gap-1 text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {item.description}
                  </p>

                  {/* Tech Stack */}
                  {item.techStack && (
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Technologies Used:</h5>
                      <div className="flex flex-wrap gap-2">
                        {item.techStack.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {item.achievements && (
                    <div>
                      <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                        <Award className="w-4 h-4" />
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {item.achievements.map((achievement, achIndex) => (
                          <li key={achIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Journey Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {[
            { label: 'Years of Learning', value: '3+', icon: '📚' },
            { label: 'Projects Completed', value: '15+', icon: '🚀' },
            { label: 'Technologies Mastered', value: '20+', icon: '⚡' },
            { label: 'Certifications Earned', value: '5+', icon: '🏆' }
          ].map((stat, index) => (
            <div key={index} className="text-center bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stat.value}</div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};