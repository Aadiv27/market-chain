import React, { useState } from 'react';
import { ExternalLink, Github, Star, Calendar, Users, Code, Zap } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  linkedinUrl?: string;
  featured: boolean;
  status: 'Featured' | 'Completed' | 'In Progress' | 'Planned';
  category: 'DevOps' | 'AI/ML' | 'Full Stack' | 'Cloud';
  image: string;
  stats?: {
    stars?: number;
    forks?: number;
    commits?: number;
  };
}

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: 'Automated CI/CD Pipeline with Jenkins',
      description: 'A comprehensive CI/CD pipeline automation system built with Jenkins, Docker, and AWS. Features automated testing, deployment, and monitoring capabilities.',
      longDescription: 'Enterprise-grade CI/CD pipeline that automates the entire software delivery process from code commit to production deployment. Includes automated testing, security scanning, containerization, and multi-environment deployment strategies.',
      techStack: ['Jenkins', 'Docker', 'AWS', 'Python', 'Linux', 'Terraform', 'Kubernetes'],
      githubUrl: 'https://github.com/Aadiv27/Automate.git',
      featured: true,
      status: 'Featured',
      category: 'DevOps',
      image: 'https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { stars: 45, forks: 12, commits: 156 }
    },
    {
      id: 2,
      title: 'Docker Menu-Based Management System',
      description: 'Interactive Docker management system with a user-friendly menu interface for container operations, image management, and system monitoring.',
      longDescription: 'A comprehensive Docker management tool featuring an intuitive CLI interface for managing containers, images, networks, and volumes. Includes monitoring dashboards and automated backup systems.',
      techStack: ['Docker', 'Python', 'Linux', 'Bash', 'Prometheus', 'Grafana'],
      githubUrl: 'https://github.com/Aadiv27',
      featured: true,
      status: 'Featured',
      category: 'DevOps',
      image: '',
      stats: { stars: 32, forks: 8, commits: 89 }
    },
    {
      id: 3,
      title: 'Streamlit College Info Dashboard',
      description: 'A comprehensive dashboard application for college information management with real-time data visualization and student analytics.',
      longDescription: 'Modern web application for educational institutions featuring student management, course tracking, performance analytics, and administrative tools with beautiful data visualizations.',
      techStack: ['Streamlit', 'Python', 'Pandas', 'Plotly', 'SQLite', 'NumPy'],
      githubUrl: '',
      liveUrl: 'https://college-dashboard.streamlit.app',
      status: 'Completed',
      category: 'Full Stack',
      featured: false,
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { stars: 28, forks: 15, commits: 67 }
    },
    {
      id: 4,
      title: 'AI Attendance System',
      description: 'Machine learning-powered attendance system using facial recognition technology. Shared insights and development process on LinkedIn.',
      longDescription: 'Advanced facial recognition system for automated attendance tracking in educational and corporate environments. Features real-time detection, anti-spoofing measures, and comprehensive reporting.',
      techStack: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'SQLite', 'NumPy'],
      githubUrl: 'https://github.com/Aadiv27/Attendance-Monitor-system.git',
      linkedinUrl: 'https://www.linkedin.com/in/aadiv-pandey-92a51b339',
      status: 'Completed',
      category: 'AI/ML',
      featured: false,
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { stars: 67, forks: 23, commits: 134 }
    },
    {
      id: 5,
      title: 'Generative AI: Bank Manager',
      description: 'An AI-powered bank management system using generative AI for customer service automation and intelligent financial advisory.',
      longDescription: 'Cutting-edge banking solution leveraging generative AI for personalized customer interactions, automated financial advice, fraud detection, and intelligent transaction processing.',
      techStack: ['Python', 'OpenAI', 'Flask', 'SQLite', 'LangChain', 'Streamlit'],
      githubUrl: 'https://github.com/Aadiv27',
      status: 'In Progress',
      category: 'AI/ML',
      featured: false,
      image: 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { commits: 78 }
    },
    {
      id: 6,
      title: 'Cloud Infrastructure as Code',
      description: 'Terraform-based infrastructure automation for AWS cloud resources with monitoring and cost optimization.',
      longDescription: 'Complete infrastructure automation solution using Terraform for AWS cloud deployment, featuring auto-scaling, monitoring, backup strategies, and cost optimization tools.',
      techStack: ['Terraform', 'AWS', 'CloudWatch', 'Lambda', 'S3', 'EC2'],
      githubUrl: 'https://github.com/Aadiv27',
      status: 'Completed',
      category: 'Cloud',
      featured: false,
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400',
      stats: { stars: 41, forks: 18, commits: 92 }
    }
  ];

  const categories = ['All', 'DevOps', 'AI/ML', 'Full Stack', 'Cloud'];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Featured': return 'bg-gradient-to-r from-yellow-400 to-orange-500';
      case 'Completed': return 'bg-gradient-to-r from-green-400 to-emerald-500';
      case 'In Progress': return 'bg-gradient-to-r from-blue-400 to-purple-500';
      case 'Planned': return 'bg-gradient-to-r from-gray-400 to-gray-500';
      default: return 'bg-gradient-to-r from-gray-400 to-gray-500';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'DevOps': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'AI/ML': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Full Stack': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200';
      case 'Cloud': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <section id="projects" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Showcasing my expertise in DevOps, Cloud Computing, AI/ML, and Full-Stack Development
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {filteredProjects.map((project, index) => (
            <div
              key={project.id}
              className={`group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 overflow-hidden ${
                project.featured ? 'ring-2 ring-yellow-400 ring-opacity-50' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-2 bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-sm font-bold">
                    <Star className="w-4 h-4 fill-current" />
                    Featured
                  </div>
                )}

                {/* Category Badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(project.category)}`}>
                  {project.category}
                </div>

                {/* Status Badge */}
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white ${getStatusColor(project.status)}`}>
                  {project.status}
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {hoveredProject === project.id ? project.longDescription : project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 4).map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:scale-105 transition-transform duration-200"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 4 && (
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm font-medium">
                      +{project.techStack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Project Stats */}
                {project.stats && (
                  <div className="flex items-center gap-4 mb-6 text-sm text-gray-500 dark:text-gray-400">
                    {project.stats.stars && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {project.stats.stars}
                      </div>
                    )}
                    {project.stats.forks && (
                      <div className="flex items-center gap-1">
                        <Code className="w-4 h-4" />
                        {project.stats.forks}
                      </div>
                    )}
                    {project.stats.commits && (
                      <div className="flex items-center gap-1">
                        <Zap className="w-4 h-4" />
                        {project.stats.commits}
                      </div>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 dark:bg-gray-700 text-white rounded-lg hover:bg-gray-800 dark:hover:bg-gray-600 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                  >
                    <Github className="w-4 h-4" />
                    Code
                  </a>
                  
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Live
                    </a>
                  )}
                  
                  {project.linkedinUrl && (
                    <a
                      href={project.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      <ExternalLink className="w-4 h-4" />
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>

              {/* Hover Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-t from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}></div>
            </div>
          ))}
        </div>

        {/* Projects Summary */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Project Portfolio Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {projects.length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Total Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {projects.filter(p => p.featured).length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Featured Projects</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">
                  {categories.length - 1}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Technology Areas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  {projects.filter(p => p.status === 'Completed').length}
                </div>
                <div className="text-gray-600 dark:text-gray-300">Completed</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};