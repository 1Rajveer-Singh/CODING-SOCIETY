import React from 'react';
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
  PlayCircle
} from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  const features = [
    {
      icon: Code,
      title: 'Interactive Coding',
      description: 'Practice coding with our built-in editor and real-time feedback system.',
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: 'Learning Roadmaps',
      description: 'Follow structured learning paths for Frontend, Backend, and AI/ML.',
      color: 'bg-green-500'
    },
    {
      icon: Trophy,
      title: 'Coding Challenges',
      description: 'Test your skills with quizzes and compete on leaderboards.',
      color: 'bg-yellow-500'
    },
    {
      icon: Microscope,
      title: 'Research Hub',
      description: 'Share and discover innovative research papers with peer reviews.',
      color: 'bg-purple-500'
    },
    {
      icon: Briefcase,
      title: 'Career Growth',
      description: 'Access internships, hackathons, and build your professional portfolio.',
      color: 'bg-red-500'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with like-minded developers and share your journey.',
      color: 'bg-indigo-500'
    }
  ];

  const trendingPosts = [
    {
      id: 1,
      title: 'Building React Apps with TypeScript',
      author: 'Sarah Chen',
      likes: 234,
      comments: 45,
      timeAgo: '2 hours ago',
      tags: ['React', 'TypeScript', 'Frontend']
    },
    {
      id: 2,
      title: 'Machine Learning for Beginners',
      author: 'Alex Kumar',
      likes: 156,
      comments: 23,
      timeAgo: '5 hours ago',
      tags: ['ML', 'Python', 'AI']
    },
    {
      id: 3,
      title: 'Node.js Best Practices 2024',
      author: 'Mike Johnson',
      likes: 189,
      comments: 34,
      timeAgo: '1 day ago',
      tags: ['Node.js', 'Backend', 'JavaScript']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Coding Society
          </h1>
          <p className="text-xl md:text-2xl font-light mb-4">
            The Game Changer
          </p>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Join the ultimate coding community where innovation meets education. 
            Learn, build, research, and grow your career in technology.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                  <Link to="/auth">
                    Get Started Free
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="#features">
                    <PlayCircle className="mr-2 w-4 h-4" />
                    Learn More
                  </Link>
                </Button>
              </>
            ) : (
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
                <Link to="/feed">
                  Go to Dashboard
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-white rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-40 right-20 w-1 h-1 bg-blue-200 rounded-full opacity-80 animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-1.5 h-1.5 bg-purple-200 rounded-full opacity-70 animate-pulse delay-500"></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything You Need to Excel
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              From interactive coding environments to career development tools, 
              we provide a comprehensive platform for your tech journey.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trending Posts Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Trending Posts
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Discover what the community is talking about
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to={isAuthenticated ? "/feed" : "/auth"}>
                View All
                <TrendingUp className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trendingPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription>
                    by {post.author} • {post.timeAgo}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {post.comments}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Transform Your Coding Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already building their future with Coding Society.
          </p>
          {!isAuthenticated && (
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" asChild>
              <Link to="/auth">
                Join Coding Society
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
