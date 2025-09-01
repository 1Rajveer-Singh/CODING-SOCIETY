import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { useAuth } from '../context/AuthContext';
import { 
  Code, 
  Users, 
  Trophy, 
  BookOpen, 
  Microscope, 
  Briefcase,
  Star,
  TrendingUp,
  ArrowRight,
  PlayCircle,
  Zap,
  Globe,
  Target,
  Rocket,
  Brain,
  Shield,
  Award,
  Clock,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Github,
  Coffee,
  Layers,
  Smartphone,
  Database,
  Cloud,
  Cpu,
  Monitor,
  Terminal,
  Code2,
  Sparkles,
  TrendingDown,
  Activity,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [stats, setStats] = useState({ users: 0, projects: 0, communities: 0, courses: 0 });
  const [typedText, setTypedText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const heroRef = useRef(null);

  // Typing animation words
  const words = ['Developers', 'Innovators', 'Researchers', 'Creators', 'Engineers'];

  // Animated statistics
  useEffect(() => {
    const targetStats = { users: 50000, projects: 12000, communities: 500, courses: 200 };
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setStats({
        users: Math.floor(targetStats.users * progress),
        projects: Math.floor(targetStats.projects * progress),
        communities: Math.floor(targetStats.communities * progress),
        courses: Math.floor(targetStats.courses * progress)
      });

      if (currentStep >= steps) {
        clearInterval(interval);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentWord = words[currentWordIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= currentWord.length) {
        setTypedText(currentWord.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          const deleteInterval = setInterval(() => {
            if (charIndex > 0) {
              charIndex--;
              setTypedText(currentWord.slice(0, charIndex));
            } else {
              clearInterval(deleteInterval);
              setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
          }, 50);
        }, 1500);
      }
    }, 100);

    return () => clearInterval(typeInterval);
  }, [currentWordIndex]);

  // Particle animation for hero section
  useEffect(() => {
    const createParticle = () => {
      if (!heroRef.current) return;
      
      const particle = document.createElement('div');
      particle.className = 'absolute w-1 h-1 bg-white rounded-full opacity-60 animate-pulse';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 2 + 's';
      particle.style.animationDuration = (2 + Math.random() * 3) + 's';
      
      heroRef.current.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 5000);
    };

    const particleInterval = setInterval(createParticle, 300);
    return () => clearInterval(particleInterval);
  }, []);

  const features = [
    {
      icon: Code,
      title: 'Interactive Coding',
      description: 'Practice coding with our AI-powered editor and real-time feedback system.',
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500',
      metrics: '10K+ exercises'
    },
    {
      icon: BookOpen,
      title: 'Learning Roadmaps',
      description: 'Follow personalized learning paths with adaptive difficulty.',
      color: 'bg-gradient-to-br from-green-500 to-emerald-500',
      metrics: '50+ roadmaps'
    },
    {
      icon: Trophy,
      title: 'Coding Challenges',
      description: 'Compete in real-time tournaments and climb global leaderboards.',
      color: 'bg-gradient-to-br from-yellow-500 to-orange-500',
      metrics: '1K+ challenges'
    },
    {
      icon: Microscope,
      title: 'Research Hub',
      description: 'Collaborate on cutting-edge research with AI-assisted analysis.',
      color: 'bg-gradient-to-br from-purple-500 to-pink-500',
      metrics: '500+ papers'
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Access exclusive opportunities with fortune 500 companies.',
      color: 'bg-gradient-to-br from-red-500 to-rose-500',
      metrics: '2K+ jobs'
    },
    {
      icon: Users,
      title: 'Global Community',
      description: 'Connect with developers from 180+ countries worldwide.',
      color: 'bg-gradient-to-br from-indigo-500 to-purple-500',
      metrics: '50K+ members'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      role: 'Senior Frontend Developer',
      company: 'Google',
      image: '👩‍💻',
      content: 'Coding Society transformed my career. The interactive learning paths and community support helped me land my dream job at Google.',
      rating: 5
    },
    {
      name: 'Alex Kumar',
      role: 'AI Research Scientist',
      company: 'OpenAI',
      image: '👨‍🔬',
      content: 'The research collaboration features are incredible. I published 3 papers thanks to the connections I made here.',
      rating: 5
    },
    {
      name: 'Maria Rodriguez',
      role: 'Full Stack Engineer',
      company: 'Meta',
      image: '👩‍💼',
      content: 'The coding challenges pushed my limits. I went from beginner to expert in just 6 months!',
      rating: 5
    },
    {
      name: 'David Park',
      role: 'Tech Lead',
      company: 'Microsoft',
      image: '👨‍💻',
      content: 'Best platform for continuous learning. The roadmaps are perfectly structured and up-to-date.',
      rating: 5
    }
  ];

  const techStack = [
    { name: 'React', icon: '⚛️', color: 'text-blue-500', description: 'Modern UI Framework' },
    { name: 'Node.js', icon: '🟢', color: 'text-green-500', description: 'Backend Runtime' },
    { name: 'Python', icon: '🐍', color: 'text-yellow-500', description: 'AI & Analytics' },
    { name: 'Docker', icon: '🐳', color: 'text-blue-600', description: 'Containerization' },
    { name: 'AWS', icon: '☁️', color: 'text-orange-500', description: 'Cloud Infrastructure' },
    { name: 'GraphQL', icon: '📊', color: 'text-pink-500', description: 'Query Language' },
    { name: 'TypeScript', icon: '📘', color: 'text-blue-700', description: 'Type Safety' },
    { name: 'MongoDB', icon: '🍃', color: 'text-green-600', description: 'NoSQL Database' }
  ];

  const achievements = [
    { icon: Award, value: '99%', label: 'Success Rate', description: 'Job placement success' },
    { icon: Clock, value: '24/7', label: 'Support', description: 'Always available help' },
    { icon: Globe, value: '180+', label: 'Countries', description: 'Global community reach' },
    { icon: Zap, value: '10ms', label: 'Response Time', description: 'Lightning fast platform' }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'Building Scalable React Apps with Advanced Patterns',
      author: 'Sarah Chen',
      likes: 2840,
      comments: 156,
      timeAgo: '2 hours ago',
      tags: ['React', 'Architecture', 'Performance'],
      trending: true,
      readTime: '8 min'
    },
    {
      id: 2,
      title: 'Complete Guide to Machine Learning with PyTorch',
      author: 'Alex Kumar',
      likes: 1956,
      comments: 89,
      timeAgo: '5 hours ago',
      tags: ['ML', 'PyTorch', 'Deep Learning'],
      trending: true,
      readTime: '15 min'
    },
    {
      id: 3,
      title: 'Node.js Microservices: Best Practices for 2024',
      author: 'Mike Johnson',
      likes: 1234,
      comments: 67,
      timeAgo: '1 day ago',
      tags: ['Node.js', 'Microservices', 'Backend'],
      trending: false,
      readTime: '12 min'
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      {/* Advanced Hero Section with Particles */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 text-white py-32 px-4 overflow-hidden"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-indigo-600/20 animate-pulse"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-white/20 rounded-full animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-purple-300/30 rounded-lg animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-r from-cyan-400/30 to-blue-500/30 rounded-full animate-ping"></div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/30 shadow-lg">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-sm font-bold text-white text-shadow-md">Join 50,000+ developers worldwide</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight text-shadow-xl">
            <span className="text-white font-black text-shadow-xl drop-shadow-2xl">
              Coding Society
            </span>
            <br />
            <span className="text-3xl md:text-5xl font-black text-white text-shadow-xl">
              for {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl font-bold mb-6 max-w-4xl mx-auto text-white text-shadow-lg">
            The ultimate platform where innovation meets education.
          </p>
          <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto font-semibold text-gray-100 text-shadow-md">
            Master coding, advance your career, and build the future with our AI-powered learning ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            {!isAuthenticated ? (
              <>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold shadow-2xl transform hover:scale-105 transition-all duration-300" 
                  asChild
                >
                  <Link to="/auth">
                    <Rocket className="mr-3 w-5 h-5" />
                    Start Your Journey
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg font-semibold" 
                  asChild
                >
                  <Link to="#demo">
                    <PlayCircle className="mr-3 w-5 h-5" />
                    Watch Demo
                  </Link>
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl" 
                asChild
              >
                <Link to="/feed">
                  <Target className="mr-3 w-5 h-5" />
                  Continue Learning
                  <ArrowRight className="ml-3 w-5 h-5" />
                </Link>
              </Button>
            )}
          </div>

          {/* Real-time Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-blue-300 mb-2 text-shadow">
                {stats.users.toLocaleString()}+
              </div>
              <div className="text-sm font-bold text-gray-200 text-shadow">Active Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-purple-300 mb-2 text-shadow">
                {stats.projects.toLocaleString()}+
              </div>
              <div className="text-sm font-bold text-gray-200 text-shadow">Projects Built</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-green-300 mb-2 text-shadow">
                {stats.communities.toLocaleString()}+
              </div>
              <div className="text-sm font-bold text-gray-200 text-shadow">Communities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-black text-yellow-300 mb-2 text-shadow">
                {stats.courses.toLocaleString()}+
              </div>
              <div className="text-sm font-bold text-gray-200 text-shadow">Courses Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Features Section with 3D Cards */}
      <section id="features" className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full px-4 py-2 mb-6 border-2 border-blue-200 dark:border-blue-700">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-black text-shadow-sm">Powerful Features</span>
            </div>
            <h2 className="text-5xl font-black text-black dark:text-white mb-6 text-shadow-xl">
              Everything You Need to
              <span className="block text-blue-800 dark:text-blue-200 font-black text-shadow-xl">
                Excel in Tech
              </span>
            </h2>
            <p className="text-xl font-bold text-black dark:text-white max-w-3xl mx-auto text-shadow-md">
              Experience the future of coding education with our AI-powered platform
              designed for the next generation of developers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden relative"
                >
                  {/* Card background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <CardHeader className="relative z-10">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl mb-3 font-black text-black dark:text-white group-hover:text-blue-800 dark:group-hover:text-blue-200 transition-colors text-shadow-md">
                      {feature.title}
                    </CardTitle>
                    <div className="text-sm text-blue-800 dark:text-blue-200 font-black mb-3 text-shadow-sm">
                      {feature.metrics}
                    </div>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <CardDescription className="text-base leading-relaxed text-black dark:text-white font-bold text-shadow-sm">
                      {feature.description}
                    </CardDescription>
                    <div className="mt-6">
                      <Button variant="outline" className="group-hover:bg-blue-700 group-hover:text-white group-hover:border-blue-700 transition-all duration-300 text-black dark:text-white border-black dark:border-white font-bold">
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technology Stack Showcase */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-shadow">
              Built with Modern Technology
            </h2>
            <p className="text-xl font-semibold text-gray-200 max-w-3xl mx-auto">
              Our platform leverages cutting-edge technologies to deliver the best learning experience
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {techStack.map((tech, index) => (
              <div 
                key={index}
                className="group text-center p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105"
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <div className="text-lg font-black mb-2 text-white text-shadow-md">
                  {tech.name}
                </div>
                <div className="text-sm font-bold text-gray-100 text-shadow-sm">
                  {tech.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advanced Testimonials Carousel */}
      <section className="py-24 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-black dark:text-white mb-6 text-shadow-xl">
              Success Stories from Our Community
            </h2>
            <p className="text-xl font-bold text-black dark:text-white text-shadow-md">
              See how developers like you transformed their careers with Coding Society
            </p>
          </div>
          
          <div className="relative">
            <div className="overflow-hidden rounded-3xl bg-white dark:bg-gray-900 shadow-2xl">
              <div className="p-12">
                <div className="flex items-center justify-between mb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="rounded-full p-3"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex space-x-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentTestimonial(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentTestimonial 
                            ? 'bg-blue-600 w-8' 
                            : 'bg-gray-300 dark:bg-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="rounded-full p-3"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
                
                <div className="text-center">
                  <div className="text-6xl mb-6">
                    {testimonials[currentTestimonial].image}
                  </div>
                  <blockquote className="text-xl md:text-2xl font-bold text-black dark:text-white mb-8 leading-relaxed max-w-4xl mx-auto text-shadow-md">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <div className="text-lg font-bold text-black dark:text-white text-shadow-sm">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-blue-700 dark:text-blue-300 font-bold">
                    {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievement Metrics */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-shadow">
              Proven Results That Speak for Themselves
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => {
              const Icon = achievement.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-black mb-3 text-white text-shadow-xl">
                    {achievement.value}
                  </div>
                  <div className="text-xl font-bold mb-2 text-white text-shadow-lg">
                    {achievement.label}
                  </div>
                  <div className="text-gray-100 font-semibold text-shadow-md">
                    {achievement.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Trending Posts Section */}
      <section className="py-24 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-16">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full px-4 py-2 mb-4">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Hot Topics</span>
              </div>
              <h2 className="text-4xl font-black text-black dark:text-white mb-4 text-shadow-xl">
                Trending in the Community
              </h2>
              <p className="text-xl font-bold text-black dark:text-white text-shadow-md">
                Discover the most popular content and join the conversation
              </p>
            </div>
            <Button variant="outline" size="lg" asChild>
              <Link to={isAuthenticated ? "/feed" : "/auth"}>
                View All Posts
                <TrendingUp className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {post.trending && (
                        <div className="flex items-center gap-1 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                          <Activity className="w-3 h-3" />
                          Trending
                        </div>
                      )}
                      <span className="text-xs text-gray-700 dark:text-gray-300 font-semibold">
                        {post.readTime} read
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-blue-600 transition-colors font-bold">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="flex items-center justify-between font-medium">
                    <span>by {post.author}</span>
                    <span>{post.timeAgo}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-700 dark:text-gray-300 font-semibold">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                        <Star className="w-4 h-4" />
                        {post.likes.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-1 hover:text-blue-500 transition-colors cursor-pointer">
                        <Users className="w-4 h-4" />
                        {post.comments}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-blue-700 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-200 font-bold">
                      Read More
                      <ArrowRight className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Code Preview Section */}
      <section id="demo" className="py-24 px-4 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-6 text-shadow">
              Experience Our Interactive Platform
            </h2>
            <p className="text-xl font-bold text-gray-100 max-w-3xl mx-auto text-shadow-md">
              See how our AI-powered coding environment helps you learn faster and build better projects
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <span className="text-gray-300 text-sm font-semibold">main.js</span>
                </div>
                <div className="font-mono text-sm space-y-1">
                  <div className="flex">
                    <span className="text-gray-400 mr-4">1</span>
                    <span className="text-purple-400">function </span>
                    <span className="text-blue-400">fibonacci</span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">n</span>
                    <span className="text-white">) {'{'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-4">2</span>
                    <span className="ml-4 text-blue-400">if </span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">n</span>
                    <span className="text-white"> &lt;= 1) return </span>
                    <span className="text-orange-400">n</span>
                    <span className="text-white">;</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-4">3</span>
                    <span className="ml-4 text-blue-400">return </span>
                    <span className="text-yellow-400">fibonacci</span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">n</span>
                    <span className="text-white">-1) + </span>
                    <span className="text-yellow-400">fibonacci</span>
                    <span className="text-white">(</span>
                    <span className="text-orange-400">n</span>
                    <span className="text-white">-2);</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-4">4</span>
                    <span className="text-white">{'}'}</span>
                  </div>
                  <div className="flex">
                    <span className="text-gray-400 mr-4">5</span>
                    <span className="text-green-400">// AI Suggestion: Consider memoization</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 text-white text-shadow-lg">AI-Powered Assistance</h3>
                  <p className="text-gray-100 font-semibold text-shadow-md">Get intelligent code suggestions, bug fixes, and optimization tips in real-time.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-shadow">Instant Feedback</h3>
                  <p className="text-gray-200 font-medium">Receive immediate feedback on your code quality, performance, and best practices.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2 text-white text-shadow-lg">Collaborative Coding</h3>
                  <p className="text-gray-100 font-semibold text-shadow-md">Code together with peers in real-time, share projects, and learn from each other.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section with Dynamic Effects */}
      <section className="py-32 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 animate-pulse"></div>
          <div className="absolute top-20 left-20 w-32 h-32 border border-white/20 rounded-full animate-spin" style={{animationDuration: '15s'}}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 border border-white/30 rounded-lg animate-bounce" style={{animationDelay: '2s'}}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto text-center z-10">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 mb-6 border border-white/40 shadow-lg">
              <Rocket className="w-5 h-5" />
              <span className="text-sm font-bold text-white text-shadow-md">Limited Time Offer</span>
            </div>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight text-shadow-xl">
            Ready to Transform Your
            <span className="block text-yellow-300 font-black text-shadow-xl drop-shadow-2xl">
              Coding Journey?
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl mb-12 font-bold max-w-3xl mx-auto text-white text-shadow-lg">
            Join our community of innovators and accelerate your path to becoming 
            an exceptional developer with our cutting-edge platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {!isAuthenticated ? (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-2xl" 
                  asChild
                >
                  <Link to="/auth">
                    <Star className="mr-3 w-6 h-6" />
                    Start Free Today
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white text-white hover:bg-white hover:text-blue-600 px-12 py-6 text-xl font-bold rounded-2xl backdrop-blur-sm" 
                  asChild
                >
                  <Link to="#features">
                    <PlayCircle className="mr-3 w-6 h-6" />
                    Explore Features
                  </Link>
                </Button>
              </>
            ) : (
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl rounded-2xl" 
                asChild
              >
                <Link to="/feed">
                  <Target className="mr-3 w-6 h-6" />
                  Continue Your Journey
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Link>
              </Button>
            )}
          </div>
          
          <div className="flex flex-wrap justify-center gap-8 text-white font-bold text-shadow-md">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-300" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
