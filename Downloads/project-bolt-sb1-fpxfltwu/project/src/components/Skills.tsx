import React, { useState } from 'react';
import { 
  Code, 
  Database, 
  Cloud, 
  Cpu, 
  Globe, 
  Terminal,
  Server,
  GitBranch,
  Monitor,
  Smartphone,
  Brain,
  Settings
} from 'lucide-react';

interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ReactNode;
  category: string;
  description: string;
}

export const Skills: React.FC = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skills: Skill[] = [
    // Languages
    { 
      name: 'Python', 
      level: 'Advanced', 
      icon: <Code className="w-8 h-8" />, 
      category: 'Languages',
      description: 'Backend development, AI/ML, automation scripts'
    },
    { 
      name: 'JavaScript', 
      level: 'Advanced', 
      icon: <Code className="w-8 h-8" />, 
      category: 'Languages',
      description: 'Frontend & backend development, modern ES6+'
    },
    { 
      name: 'Bash', 
      level: 'Intermediate', 
      icon: <Terminal className="w-8 h-8" />, 
      category: 'Languages',
      description: 'Shell scripting, automation, system administration'
    },
    { 
      name: 'C/C++', 
      level: 'Intermediate', 
      icon: <Code className="w-8 h-8" />, 
      category: 'Languages',
      description: 'System programming, competitive programming'
    },
    { 
      name: 'HTML5', 
      level: 'Advanced', 
      icon: <Globe className="w-8 h-8" />, 
      category: 'Languages',
      description: 'Semantic markup, modern web standards'
    },
    { 
      name: 'CSS3', 
      level: 'Advanced', 
      icon: <Globe className="w-8 h-8" />, 
      category: 'Languages',
      description: 'Modern styling, animations, responsive design'
    },
    
    // Frontend
    { 
      name: 'React.js', 
      level: 'Advanced', 
      icon: <Globe className="w-8 h-8" />, 
      category: 'Frontend',
      description: 'Component-based UI development, hooks, state management'
    },
    { 
      name: 'Tailwind CSS', 
      level: 'Advanced', 
      icon: <Smartphone className="w-8 h-8" />, 
      category: 'Frontend',
      description: 'Utility-first CSS framework, rapid UI development'
    },
    { 
      name: 'Streamlit', 
      level: 'Advanced', 
      icon: <Monitor className="w-8 h-8" />, 
      category: 'Frontend',
      description: 'Data science web apps, ML model deployment'
    },
    
    // Backend
    { 
      name: 'Node.js', 
      level: 'Intermediate', 
      icon: <Server className="w-8 h-8" />, 
      category: 'Backend',
      description: 'Server-side JavaScript, REST APIs'
    },
    { 
      name: 'Express.js', 
      level: 'Intermediate', 
      icon: <Server className="w-8 h-8" />, 
      category: 'Backend',
      description: 'Web framework, middleware, routing'
    },
    { 
      name: 'Firebase', 
      level: 'Intermediate', 
      icon: <Database className="w-8 h-8" />, 
      category: 'Backend',
      description: 'Real-time database, authentication, hosting'
    },
    
    // AI/ML Tools
    { 
      name: 'Pandas', 
      level: 'Advanced', 
      icon: <Brain className="w-8 h-8" />, 
      category: 'AI/ML Tools',
      description: 'Data manipulation, analysis, preprocessing'
    },
    { 
      name: 'NumPy', 
      level: 'Advanced', 
      icon: <Brain className="w-8 h-8" />, 
      category: 'AI/ML Tools',
      description: 'Numerical computing, array operations'
    },
    { 
      name: 'Scikit-learn', 
      level: 'Intermediate', 
      icon: <Brain className="w-8 h-8" />, 
      category: 'AI/ML Tools',
      description: 'Machine learning algorithms, model training'
    },
    { 
      name: 'OpenCV', 
      level: 'Intermediate', 
      icon: <Brain className="w-8 h-8" />, 
      category: 'AI/ML Tools',
      description: 'Computer vision, image processing'
    },
    { 
      name: 'YOLOv8', 
      level: 'Intermediate', 
      icon: <Brain className="w-8 h-8" />, 
      category: 'AI/ML Tools',
      description: 'Object detection, real-time inference'
    },
    
    // DevOps & Cloud
    { 
      name: 'Docker', 
      level: 'Advanced', 
      icon: <Cloud className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'Containerization, microservices deployment'
    },
    { 
      name: 'Kubernetes', 
      level: 'Intermediate', 
      icon: <Cloud className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'Container orchestration, scaling, management'
    },
    { 
      name: 'Jenkins', 
      level: 'Advanced', 
      icon: <Settings className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'CI/CD pipelines, automated testing & deployment'
    },
    { 
      name: 'GitHub Actions', 
      level: 'Advanced', 
      icon: <Settings className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'Workflow automation, CI/CD, code quality checks'
    },
    { 
      name: 'AWS', 
      level: 'Advanced', 
      icon: <Cloud className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'EC2, S3, Lambda, cloud infrastructure'
    },
    { 
      name: 'GCP', 
      level: 'Intermediate', 
      icon: <Cloud className="w-8 h-8" />, 
      category: 'DevOps & Cloud',
      description: 'Compute Engine, Storage, cloud services'
    },
    
    // Version Control & OS
    { 
      name: 'Git & GitHub', 
      level: 'Advanced', 
      icon: <GitBranch className="w-8 h-8" />, 
      category: 'Version Control & OS',
      description: 'Version control, collaboration, code management'
    },
    { 
      name: 'Linux', 
      level: 'Advanced', 
      icon: <Terminal className="w-8 h-8" />, 
      category: 'Version Control & OS',
      description: 'Ubuntu/RHEL, system administration, shell scripting'
    },
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-yellow-500';
      case 'Intermediate': return 'bg-orange-500';
      case 'Advanced': return 'bg-emerald-500';
      default: return 'bg-gray-500';
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Intermediate': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Advanced': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const categories = [
    'Languages',
    'Frontend', 
    'Backend',
    'AI/ML Tools',
    'DevOps & Cloud',
    'Version Control & OS'
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A comprehensive toolkit spanning full-stack development, DevOps, cloud computing, and AI/ML
          </p>
        </div>

        <div className="max-w-7xl mx-auto">
          {categories.map((category, categoryIndex) => (
            <div key={category} className="mb-16">
              <div className="text-center mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                  {category}
                </h3>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {skills
                  .filter(skill => skill.category === category)
                  .map((skill, index) => (
                    <div
                      key={skill.name}
                      className="group relative"
                      onMouseEnter={() => setHoveredSkill(skill.name)}
                      onMouseLeave={() => setHoveredSkill(null)}
                    >
                      <div className="relative bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 border border-gray-100 dark:border-gray-700">
                        {/* Skill Icon */}
                        <div className="flex flex-col items-center text-center">
                          <div className="text-blue-600 dark:text-blue-400 mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                            {skill.icon}
                          </div>
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                            {skill.name}
                          </h4>
                          
                          {/* Level Badge */}
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadgeColor(skill.level)}`}>
                            {skill.level}
                          </span>
                        </div>

                        {/* Hover Tooltip */}
                        {hoveredSkill === skill.name && (
                          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-lg shadow-lg z-10 w-48 text-center">
                            <div className="font-medium mb-1">{skill.name}</div>
                            <div className="text-gray-300 dark:text-gray-400">{skill.description}</div>
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                          </div>
                        )}

                        {/* Gradient Border on Hover */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Expertise Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {skills.filter(s => s.level === 'Advanced').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Advanced Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {skills.filter(s => s.level === 'Intermediate').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Intermediate Skills</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {categories.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Technology Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};