import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { 
  ChevronDown, 
  ChevronRight, 
  CheckCircle, 
  Circle, 
  Lock,
  Star,
  Clock,
  Users,
  Brain,
  Sparkles,
  Search,
  Filter,
  BookOpen,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  PlayCircle,
  PauseCircle,
  Share2,
  Bookmark,
  Heart,
  MessageCircle,
  Award,
  Zap,
  Flame,
  Globe,
  Code,
  Database,
  Smartphone,
  Shield,
  Settings,
  BarChart3,
  PieChart,
  Activity,
  Download,
  Upload,
  FileText,
  Video,
  Headphones,
  Monitor,
  Timer,
  RefreshCw,
  AlertCircle,
  Info,
  Plus,
  Minus,
  X,
  Eye,
  Volume2,
  Maximize,
  Briefcase
} from 'lucide-react';

const RoadmapPage = () => {
  const { user } = useAuth();

  // Enhanced state management
  const [expandedSections, setExpandedSections] = useState(['frontend']);
  const [completedItems, setCompletedItems] = useState([]);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [sortBy, setSortBy] = useState('recommended');
  const [viewMode, setViewMode] = useState('roadmap');
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  
  // Gamification states
  const [xpPoints, setXpPoints] = useState(2450);
  const [currentLevel, setCurrentLevel] = useState(3);
  const [dailyStreak, setDailyStreak] = useState(7);
  const [achievements, setAchievements] = useState([]);
  const [weeklyGoal, setWeeklyGoal] = useState(5);
  const [currentWeekProgress, setCurrentWeekProgress] = useState(3);
  
  // AI and Study features
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [studyTimer, setStudyTimer] = useState({
    isRunning: false,
    time: 0,
    currentItem: null
  });

  // Roadmap data structure
  const roadmapData = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      description: 'Master modern web development with React, TypeScript, and advanced UI frameworks',
      category: 'development',
      difficulty: 'Beginner',
      estimatedDuration: '3-4 months',
      avgSalary: '$75k',
      jobDemand: 'High',
      popularity: 85,
      icon: Globe,
      gradient: 'from-blue-500 to-purple-600',
      color: 'bg-blue-500',
      totalItems: 8,
      learningOutcomes: [
        'Build responsive web applications',
        'Master React and component architecture',
        'Implement modern CSS and styling frameworks',
        'Work with APIs and state management'
      ],
      items: [
        {
          id: 'html-css',
          title: 'HTML & CSS Fundamentals',
          description: 'Learn the building blocks of web development',
          difficulty: 'Beginner',
          duration: '2-3 weeks',
          type: 'course',
          xpReward: 100,
          skills: ['HTML5', 'CSS3', 'Responsive Design'],
          certification: true,
          locked: false,
          resources: [
            { type: 'video', title: 'HTML Basics', duration: '2h' },
            { type: 'article', title: 'CSS Grid Guide', duration: '30m' },
            { type: 'exercise', title: 'Build Landing Page', duration: '4h' }
          ]
        },
        {
          id: 'javascript',
          title: 'JavaScript Fundamentals',
          description: 'Master modern JavaScript concepts and ES6+ features',
          difficulty: 'Beginner',
          duration: '3-4 weeks',
          type: 'course',
          xpReward: 150,
          skills: ['ES6+', 'DOM Manipulation', 'Async Programming'],
          certification: true,
          locked: false,
          resources: [
            { type: 'video', title: 'JS Fundamentals', duration: '6h' },
            { type: 'exercise', title: 'Interactive Projects', duration: '8h' }
          ]
        },
        {
          id: 'react-basics',
          title: 'React Fundamentals',
          description: 'Build dynamic user interfaces with React',
          difficulty: 'Intermediate',
          duration: '4-5 weeks',
          type: 'course',
          xpReward: 200,
          skills: ['React', 'JSX', 'Components', 'State Management'],
          certification: true,
          locked: false,
          resources: [
            { type: 'video', title: 'React Complete Guide', duration: '12h' },
            { type: 'exercise', title: 'Todo App Project', duration: '6h' }
          ]
        }
      ]
    },
    {
      id: 'backend',
      title: 'Backend Development',
      description: 'Build scalable server-side applications and APIs',
      category: 'development',
      difficulty: 'Intermediate',
      estimatedDuration: '4-5 months',
      avgSalary: '$85k',
      jobDemand: 'Very High',
      popularity: 90,
      icon: Database,
      gradient: 'from-green-500 to-blue-600',
      color: 'bg-green-500',
      totalItems: 6,
      learningOutcomes: [
        'Design RESTful APIs',
        'Work with databases and data modeling',
        'Implement authentication and security',
        'Deploy and scale applications'
      ],
      items: [
        {
          id: 'nodejs',
          title: 'Node.js & Express',
          description: 'Server-side JavaScript development',
          difficulty: 'Intermediate',
          duration: '3-4 weeks',
          type: 'course',
          xpReward: 180,
          skills: ['Node.js', 'Express.js', 'REST APIs'],
          certification: true,
          locked: false
        }
      ]
    }
  ];

  // Enhanced utility functions
  const getDifficultyColor = useCallback((difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Advanced': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  }, []);

  const getTypeIcon = useCallback((type) => {
    switch (type) {
      case 'course': return BookOpen;
      case 'project': return Code;
      case 'quiz': return Target;
      case 'video': return Video;
      default: return FileText;
    }
  }, []);

  // Enhanced event handlers
  const toggleSection = useCallback((sectionId) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }, []);

  const toggleCompletion = useCallback((itemId, sectionId) => {
    setCompletedItems(prev => {
      const isCompleted = prev.includes(itemId);
      const newCompleted = isCompleted 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId];
      
      if (!isCompleted) {
        // Find the item to get XP reward
        const section = roadmapData.find(s => s.id === sectionId);
        const item = section?.items.find(i => i.id === itemId);
        if (item) {
          setXpPoints(current => current + item.xpReward);
          addNotification(`Earned ${item.xpReward} XP for completing ${item.title}!`, 'success');
        }
      }
      
      return newCompleted;
    });
  }, [roadmapData]);

  const toggleBookmark = useCallback((itemId) => {
    setBookmarkedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  }, []);

  const addNotification = useCallback((message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const generateAISuggestions = useCallback(async () => {
    setIsAiLoading(true);
    // Simulate AI suggestions
    setTimeout(() => {
      setAiSuggestions([
        {
          id: 1,
          title: 'Focus on React',
          content: 'Based on your progress, diving deeper into React would be beneficial.',
          confidence: 95,
          action: 'Start Learning'
        },
        {
          id: 2,
          title: 'Practice Projects',
          content: 'Build 2-3 projects to reinforce your learning.',
          confidence: 88,
          action: 'View Projects'
        }
      ]);
      setIsAiLoading(false);
    }, 1500);
  }, []);

  const startStudyTimer = useCallback((itemId) => {
    if (studyTimer.isRunning && studyTimer.currentItem === itemId) {
      setStudyTimer(prev => ({ ...prev, isRunning: false, currentItem: null }));
    } else {
      setStudyTimer({ isRunning: true, time: 0, currentItem: itemId });
    }
  }, [studyTimer]);

  const shareRoadmap = useCallback((sectionId) => {
    addNotification('Roadmap shared successfully!', 'success');
  }, [addNotification]);

  const exportProgress = useCallback((format) => {
    addNotification(`Progress exported as ${format.toUpperCase()}!`, 'success');
  }, [addNotification]);

  const joinStudyGroup = useCallback((itemId) => {
    addNotification('Joined study group!', 'success');
  }, [addNotification]);

  // Filtered roadmaps based on search and filters
  const filteredRoadmaps = useMemo(() => {
    return roadmapData.filter(section => {
      const matchesSearch = section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           section.items.some(item => item.title.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || section.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'all' || section.difficulty === selectedDifficulty;
      
      return matchesSearch && matchesCategory && matchesDifficulty;
    });
  }, [roadmapData, searchQuery, selectedCategory, selectedDifficulty]);

  // Effects
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (studyTimer.isRunning) {
      const interval = setInterval(() => {
        setStudyTimer(prev => ({ ...prev, time: prev.time + 1 }));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [studyTimer.isRunning]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-500" />
          <p className="text-gray-600 dark:text-gray-400">Loading your learning roadmap...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg border max-w-sm transform transition-all duration-300 ${
                notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                notification.type === 'achievement' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              } animate-slide-in`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {notification.type === 'error' && <AlertCircle className="w-4 h-4" />}
                {notification.type === 'achievement' && <Trophy className="w-4 h-4" />}
                {notification.type === 'info' && <Info className="w-4 h-4" />}
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header with XP and Level */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md">
              <Zap className="w-5 h-5 text-yellow-500" />
              <span className="font-bold text-lg">{xpPoints} XP</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md">
              <Star className="w-5 h-5 text-purple-500" />
              <span className="font-bold text-lg">Level {currentLevel}</span>
            </div>
            <div className="flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-md">
              <Flame className="w-5 h-5 text-orange-500" />
              <span className="font-bold text-lg">{dailyStreak} day streak</span>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Learning Roadmap
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-8">
            Follow structured learning paths designed by industry experts. 
            Track your progress and unlock new skills step by step.
          </p>
          
          {/* XP Progress Bar */}
          <div className="max-w-md mx-auto">
            <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
              <span>Level {currentLevel}</span>
              <span>Level {currentLevel + 1}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-blue-500 to-purple-600 h-3 rounded-full transition-all duration-300"
                style={{ width: `${((xpPoints % 1000) / 1000) * 100}%` }}
              />
            </div>
            <div className="text-center text-sm text-gray-500 mt-1">
              {1000 - (xpPoints % 1000)} XP to next level
            </div>
          </div>
        </div>

        {/* Enhanced Controls */}
        <div className="mb-8">
          <Tabs value={viewMode} onValueChange={setViewMode} className="w-full">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              <TabsList className="grid w-full lg:w-auto grid-cols-3">
                <TabsTrigger value="roadmap">Roadmap View</TabsTrigger>
                <TabsTrigger value="progress">Progress View</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportProgress('json')}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Progress
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => generateAISuggestions()}
                  disabled={isAiLoading}
                  className="flex items-center gap-2"
                >
                  {isAiLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Brain className="w-4 h-4" />
                  )}
                  AI Suggestions
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search topics, skills, or paths..."
                  className="pl-10 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="all">All Categories</option>
                  <option value="development">Development</option>
                  <option value="ai">AI & ML</option>
                  <option value="infrastructure">Infrastructure</option>
                </select>
                
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
                >
                  <option value="all">All Levels</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>
          </Tabs>
        </div>

        {/* AI Suggestions Panel */}
        {aiSuggestions.length > 0 && (
          <Card className="mb-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    AI Learning Assistant
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {aiSuggestions.map((suggestion) => (
                      <div key={suggestion.id} className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-2">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{suggestion.content}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{suggestion.confidence}% confidence</span>
                          <Button size="sm" variant="outline">
                            {suggestion.action}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Study Timer */}
        {studyTimer.isRunning && (
          <Card className="mb-8 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <Timer className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Study Session Active</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Time: {Math.floor(studyTimer.time / 60)}:{(studyTimer.time % 60).toString().padStart(2, '0')}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={() => startStudyTimer(null)}
                  variant="outline"
                >
                  Stop Session
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs value={viewMode} onValueChange={setViewMode}>
          {/* Roadmap View */}
          <TabsContent value="roadmap">
            <div className="space-y-6">
              {filteredRoadmaps.map((section) => {
                const isExpanded = expandedSections.includes(section.id);
                const completedInSection = section.items.filter(item => 
                  completedItems.includes(item.id)
                ).length;
                const IconComponent = section.icon;

                return (
                  <Card key={section.id} className="overflow-hidden group hover:shadow-2xl transition-all duration-300">
                    <CardHeader
                      className="cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => toggleSection(section.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-16 h-16 bg-gradient-to-r ${section.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <CardTitle className="text-2xl">{section.title}</CardTitle>
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${section.color} text-white`}>
                                {section.difficulty}
                              </span>
                              <span className="flex items-center gap-1 text-sm text-gray-500">
                                <TrendingUp className="w-3 h-3" />
                                {section.popularity}% popular
                              </span>
                            </div>
                            <CardDescription className="text-base mb-3">
                              {section.description}
                            </CardDescription>
                            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                {section.estimatedDuration}
                              </span>
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-4 h-4" />
                                {section.avgSalary} avg
                              </span>
                              <span className="flex items-center gap-1">
                                <Target className="w-4 h-4" />
                                {section.jobDemand} demand
                              </span>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown className="w-6 h-6 text-gray-400 transition-transform duration-200" />
                          ) : (
                            <ChevronRight className="w-6 h-6 text-gray-400 transition-transform duration-200" />
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            {completedInSection} / {section.totalItems} completed
                          </div>
                          <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                            <div
                              className={`h-3 rounded-full bg-gradient-to-r ${section.gradient} transition-all duration-300`}
                              style={{ width: `${(completedInSection / section.totalItems) * 100}%` }}
                            />
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {Math.round((completedInSection / section.totalItems) * 100)}%
                          </div>
                        </div>
                      </div>
                    </CardHeader>

                    {isExpanded && (
                      <CardContent className="pt-0">
                        {/* Learning Outcomes */}
                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <Target className="w-4 h-4" />
                            What you'll learn
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {section.learningOutcomes.map((outcome, index) => (
                              <div key={index} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                                {outcome}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Items List */}
                        <div className="grid gap-4">
                          {section.items.map((item, index) => {
                            const isCompleted = completedItems.includes(item.id);
                            const isLocked = item.locked;
                            const isBookmarked = bookmarkedItems.includes(item.id);
                            const TypeIcon = getTypeIcon(item.type);

                            return (
                              <div
                                key={item.id}
                                className={`relative flex items-center gap-4 p-6 rounded-xl border transition-all duration-300 ${
                                  isLocked 
                                    ? 'bg-gray-50 dark:bg-gray-800 opacity-60 border-gray-200 dark:border-gray-700' 
                                    : isCompleted 
                                      ? 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 shadow-lg'
                                      : 'bg-white dark:bg-gray-900 hover:shadow-xl hover:scale-[1.02] border-gray-200 dark:border-gray-700'
                                }`}
                              >
                                {/* Completion Toggle */}
                                <button
                                  onClick={() => !isLocked && toggleCompletion(item.id, section.id)}
                                  disabled={isLocked}
                                  className="flex-shrink-0 relative group"
                                >
                                  {isLocked ? (
                                    <Lock className="w-6 h-6 text-gray-400" />
                                  ) : isCompleted ? (
                                    <div className="relative">
                                      <CheckCircle className="w-6 h-6 text-green-600" />
                                      <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-25" />
                                    </div>
                                  ) : (
                                    <Circle className="w-6 h-6 text-gray-400 hover:text-blue-600 group-hover:scale-110 transition-all" />
                                  )}
                                </button>

                                {/* Content */}
                                <div className="flex-1">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                      <TypeIcon className="w-5 h-5 text-gray-500" />
                                      <h4 className={`font-semibold text-lg ${isLocked ? 'text-gray-400' : 'text-gray-900 dark:text-white'}`}>
                                        {item.title}
                                      </h4>
                                      {item.certification && (
                                        <Award className="w-4 h-4 text-yellow-500" />
                                      )}
                                    </div>
                                    
                                    <div className="flex items-center gap-2">
                                      <button
                                        onClick={() => toggleBookmark(item.id)}
                                        className={`p-1 rounded ${isBookmarked ? 'text-yellow-500' : 'text-gray-400 hover:text-yellow-500'}`}
                                      >
                                        <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
                                      </button>
                                      <button
                                        onClick={() => shareRoadmap(section.id)}
                                        className="p-1 rounded text-gray-400 hover:text-blue-500"
                                      >
                                        <Share2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </div>
                                  
                                  <p className="text-gray-600 dark:text-gray-400 mb-4">{item.description}</p>
                                  
                                  <div className="flex items-center gap-4 mb-4">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(item.difficulty)}`}>
                                      {item.difficulty}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                      <Clock className="w-3 h-3" />
                                      {item.duration}
                                    </span>
                                    <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                      <Zap className="w-3 h-3" />
                                      {item.xpReward} XP
                                    </span>
                                    {item.skills && (
                                      <div className="flex flex-wrap gap-1">
                                        {item.skills.slice(0, 3).map((skill, idx) => (
                                          <span key={idx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded">
                                            {skill}
                                          </span>
                                        ))}
                                        {item.skills.length > 3 && (
                                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded">
                                            +{item.skills.length - 3} more
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>

                                  {/* Resources */}
                                  {item.resources && (
                                    <div className="mb-4">
                                      <h5 className="font-medium text-gray-900 dark:text-white mb-2 text-sm">Resources:</h5>
                                      <div className="flex flex-wrap gap-2">
                                        {item.resources.map((resource, idx) => (
                                          <div key={idx} className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs">
                                            {resource.type === 'video' && <Video className="w-3 h-3" />}
                                            {resource.type === 'article' && <FileText className="w-3 h-3" />}
                                            {resource.type === 'exercise' && <Code className="w-3 h-3" />}
                                            <span>{resource.title}</span>
                                            <span className="text-gray-500">({resource.duration})</span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col gap-2">
                                  {!isLocked && (
                                    <>
                                      <Button
                                        size="sm"
                                        className={`${isCompleted ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                                      >
                                        {isCompleted ? 'Review' : 'Start Learning'}
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => joinStudyGroup(item.id)}
                                        className="flex items-center gap-1"
                                      >
                                        <Users className="w-3 h-3" />
                                        Study Group
                                      </Button>
                                      <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => startStudyTimer(item.id)}
                                        className="flex items-center gap-1"
                                      >
                                        {studyTimer.isRunning && studyTimer.currentItem === item.id ? (
                                          <PauseCircle className="w-3 h-3" />
                                        ) : (
                                          <PlayCircle className="w-3 h-3" />
                                        )}
                                        {studyTimer.isRunning && studyTimer.currentItem === item.id ? 'Pause' : 'Start Timer'}
                                      </Button>
                                    </>
                                  )}
                                </div>

                                {/* XP Badge */}
                                {!isLocked && (
                                  <div className="absolute top-4 right-4">
                                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                      +{item.xpReward} XP
                                    </div>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </CardContent>
                    )}
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Progress View */}
          <TabsContent value="progress">
            <div className="grid gap-6">
              {/* Weekly Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-blue-500" />
                    Weekly Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-2xl font-bold">{currentWeekProgress}/{weeklyGoal}</div>
                      <div className="text-sm text-gray-500">Topics completed this week</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 mb-1">Goal: {weeklyGoal} topics/week</div>
                      <div className="w-32 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(currentWeekProgress / weeklyGoal) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-yellow-500" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <div key={achievement.id} className="flex items-center gap-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                          <div className="text-2xl">{achievement.icon}</div>
                          <div>
                            <div className="font-medium">{achievement.title}</div>
                            <div className="text-sm text-gray-500">Unlocked</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Complete your first topic to unlock achievements!</p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Overall Progress Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-purple-500" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {filteredRoadmaps.map((section) => {
                      const completedInSection = section.items.filter(item => 
                        completedItems.includes(item.id)
                      ).length;
                      const progressPercent = (completedInSection / section.totalItems) * 100;

                      return (
                        <div key={section.id} className="text-center">
                          <div className={`w-20 h-20 mx-auto mb-3 bg-gradient-to-r ${section.gradient} rounded-2xl flex items-center justify-center shadow-lg`}>
                            <span className="text-white font-bold text-lg">
                              {Math.round(progressPercent)}%
                            </span>
                          </div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">
                            {section.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {completedInSection} of {section.totalItems} topics
                          </p>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                            <div
                              className={`h-2 rounded-full bg-gradient-to-r ${section.gradient} transition-all duration-300`}
                              style={{ width: `${progressPercent}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics View */}
          <TabsContent value="analytics">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    Learning Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{completedItems.length}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Topics Completed</div>
                    </div>
                    <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-green-600 mb-2">{dailyStreak}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Day Streak</div>
                    </div>
                    <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{currentLevel}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Current Level</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default RoadmapPage;
