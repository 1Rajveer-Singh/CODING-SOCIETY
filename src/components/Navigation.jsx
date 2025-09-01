import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useAuth } from '../context/AuthContext';
import { 
  Menu, 
  X, 
  Home, 
  User, 
  BookOpen, 
  Code, 
  Trophy, 
  Microscope, 
  Briefcase,
  LogOut,
  Moon,
  Sun,
  MessageSquare,
  Settings,
  Edit3,
  Bell,
  Shield,
  HelpCircle,
  ChevronDown,
  Search,
  Phone,
  Video,
  MoreVertical,
  Send,
  Paperclip,
  Smile,
  Mic,
  UserPlus,
  Archive,
  Trash2,
  Pin,
  Volume2,
  VolumeX,
  Check,
  CheckCheck,
  Circle,
  Clock
} from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default to dark mode
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMessageWindow, setShowMessageWindow] = useState(false);
  const [showNotificationWindow, setShowNotificationWindow] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadMessages, setUnreadMessages] = useState(5);
  const [unreadNotifications, setUnreadNotifications] = useState(3);
  
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const messageWindowRef = useRef(null);
  const notificationWindowRef = useRef(null);

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How's the coding challenge going?",
      time: "2 min ago",
      unread: 2,
      online: true,
      messages: [
        { id: 1, text: "Hey! How's the coding challenge going?", sender: "other", time: "2 min ago", status: "sent" },
        { id: 2, text: "I'm working on the React component", sender: "me", time: "1 min ago", status: "delivered" }
      ]
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b77c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The new design looks amazing! 🎨",
      time: "15 min ago",
      unread: 1,
      online: true,
      messages: [
        { id: 1, text: "The new design looks amazing! 🎨", sender: "other", time: "15 min ago", status: "sent" },
      ]
    },
    {
      id: 3,
      name: "Dev Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Meeting at 3 PM today",
      time: "1 hour ago",
      unread: 0,
      online: false,
      isGroup: true,
      messages: [
        { id: 1, text: "Meeting at 3 PM today", sender: "other", time: "1 hour ago", status: "sent" },
      ]
    },
    {
      id: 4,
      name: "AI Assistant",
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I can help you with coding questions!",
      time: "2 hours ago",
      unread: 2,
      online: true,
      isBot: true,
      messages: [
        { id: 1, text: "I can help you with coding questions!", sender: "other", time: "2 hours ago", status: "sent" },
      ]
    }
  ]);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from Alex",
      description: "Hey! How's the coding challenge going?",
      time: "2 min ago",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      type: "system",
      title: "Code review completed",
      description: "Your pull request has been approved",
      time: "1 hour ago",
      unread: true,
      icon: "check"
    },
    {
      id: 3,
      type: "achievement",
      title: "New badge earned!",
      description: "You've completed 10 coding challenges",
      time: "3 hours ago",
      unread: false,
      icon: "trophy"
    }
  ]);

  // Enhanced theme management with proper initialization
  useEffect(() => {
    // Check for saved theme preference or default to dark mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      const isDarkMode = savedTheme === 'dark';
      setIsDark(isDarkMode);
      if (isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      // Default to dark mode for gaming theme
      setIsDark(true);
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, []);

  // Apply theme changes and save to localStorage
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (messageWindowRef.current && !messageWindowRef.current.contains(event.target)) {
        setShowMessageWindow(false);
      }
      if (notificationWindowRef.current && !notificationWindowRef.current.contains(event.target)) {
        setShowNotificationWindow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
    setShowMessageWindow(false);
    setShowNotificationWindow(false);
  };

  const toggleMessageWindow = () => {
    // Navigate directly to messages page instead of showing dropdown
    navigate('/messages');
    setShowProfileDropdown(false);
    setShowNotificationWindow(false);
    setIsOpen(false);
  };

  const toggleNotificationWindow = () => {
    // Navigate directly to notifications page instead of showing dropdown
    navigate('/notifications');
    setShowProfileDropdown(false);
    setShowMessageWindow(false);
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
    setShowProfileDropdown(false);
  };

  const handleProfileAction = (action) => {
    setShowProfileDropdown(false);
    switch (action) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        console.log('Navigate to settings');
        break;
      case 'logout':
        handleLogout();
        break;
      default:
        break;
    }
  };

  const sendMessage = () => {
    if (messageText.trim() && selectedChat) {
      const newMessage = {
        id: Date.now(),
        text: messageText,
        sender: "me",
        time: "now",
        status: "sent"
      };
      
      setChats(prevChats => 
        prevChats.map(chat => 
          chat.id === selectedChat.id 
            ? { ...chat, messages: [...chat.messages, newMessage], lastMessage: messageText }
            : chat
        )
      );
      setMessageText('');
    }
  };

  const selectChat = (chat) => {
    setSelectedChat(chat);
  };

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === notificationId ? { ...notif, unread: false } : notif
      )
    );
  };

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/feed', label: 'Feed', icon: BookOpen, requiresAuth: true },
    { path: '/roadmap', label: 'Roadmap', icon: BookOpen },
    { path: '/coding', label: 'Code', icon: Code, requiresAuth: true },
    { path: '/quiz', label: 'Quiz', icon: Trophy },
    { path: '/research', label: 'Research', icon: Microscope, requiresAuth: true },
    { path: '/career', label: 'Career', icon: Briefcase, requiresAuth: true },
  ];

  const visibleNavItems = navItems.filter(item => !item.requiresAuth || isAuthenticated);

  return (
    <nav className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b-2 border-gray-300 dark:border-slate-600 sticky top-0 z-50 shadow-xl dark:shadow-slate-900/40 transition-all duration-300 overflow-visible">
      {/* Enhanced gaming glow effect with better visibility */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/8 via-purple-400/8 to-pink-400/8 pointer-events-none dark:opacity-70 opacity-30 transition-opacity duration-300"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16 w-full">
          {/* Left: Logo - "Coding Society" always visible on all devices */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-cyan-500/30 group-hover:rotate-2 flex-shrink-0">
                <Code className="w-6 h-6 text-white drop-shadow-sm" />
              </div>
              {/* Always show "Coding Society" on all devices with enhanced visibility */}
              <span className="text-lg sm:text-xl font-black text-black dark:text-white tracking-wide whitespace-nowrap drop-shadow-lg shadow-white">
                Coding Society
              </span>
            </Link>
          </div>

          {/* Middle: Navigation Items with enhanced contrast and responsive visibility */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-3 flex-1 justify-center max-w-4xl">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative flex items-center space-x-1 md:space-x-2 px-2 md:px-3 lg:px-4 py-2 md:py-2.5 lg:py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 group whitespace-nowrap shadow-sm ${
                    isActive
                      ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 border border-cyan-400'
                      : 'text-black dark:text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 border border-gray-400 dark:border-slate-500 hover:border-cyan-400'
                  }`}
                >
                  <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-all duration-300 flex-shrink-0 drop-shadow-sm ${
                    isActive ? 'text-white' : 'text-black dark:text-white group-hover:text-white'
                  }`} />
                  <span className="relative z-10 font-bold tracking-wide drop-shadow-sm hidden lg:block">{item.label}</span>
                  <span className="relative z-10 font-bold tracking-wide drop-shadow-sm lg:hidden">{item.label.split(' ')[0]}</span>
                </Link>
              );
            })}
          </div>

          {/* Right: Messages, Notifications, Profile with enhanced visibility and proper spacing */}
          <div className="flex items-center flex-shrink-0">
            {/* Desktop (lg+) and Tablet (md) right section with improved contrast and layout */}
            <div className="hidden md:flex items-center space-x-3 lg:space-x-6">
            
            {/* Messages Button - Enhanced visibility and contrast with responsive sizing */}
            <div className="relative" ref={messageWindowRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMessageWindow}
                className="relative text-black dark:text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border-2 border-gray-600 dark:border-slate-400 hover:border-cyan-400 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl font-bold shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-shadow-white dark:text-shadow-black"
              >
                <MessageSquare className="w-4 h-4 md:w-5 md:h-5 drop-shadow-lg font-bold stroke-2" />
                {unreadMessages > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    <span className="text-[10px] md:text-[11px] text-white font-black drop-shadow-sm">{unreadMessages}</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Notifications Button - Enhanced visibility and contrast with responsive sizing */}
            <div className="relative" ref={notificationWindowRef}>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleNotificationWindow}
                className="relative text-black dark:text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border-2 border-gray-600 dark:border-slate-400 hover:border-cyan-400 w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl font-bold shadow-lg bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-shadow-white dark:text-shadow-black"
              >
                <Bell className="w-4 h-4 md:w-5 md:h-5 drop-shadow-lg font-bold stroke-2" />
                {unreadNotifications > 0 && (
                  <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
                    <span className="text-[10px] md:text-[11px] text-white font-black drop-shadow-sm">{unreadNotifications}</span>
                  </div>
                )}
              </Button>
            </div>
            
            {isAuthenticated ? (
              <div className="relative" ref={profileDropdownRef}>
                {/* Profile Button - Enhanced visibility with responsive design */}
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-1.5 md:space-x-2 px-2.5 md:px-3 lg:px-4 py-2 md:py-2.5 rounded-xl bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 border-2 border-gray-400 dark:border-slate-500 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-500/25 group backdrop-blur-sm shadow-md"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 rounded-full border-2 border-gray-300 dark:border-cyan-400 shadow-lg"
                  />
                  <span className="text-xs md:text-sm font-bold text-black dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300 tracking-wide hidden sm:block max-w-16 md:max-w-20 truncate drop-shadow-sm text-shadow-white dark:text-shadow-black">
                    {user.name}
                  </span>
                  <ChevronDown className={`w-3 h-3 md:w-4 md:h-4 text-black dark:text-white transition-transform duration-300 hidden sm:block drop-shadow-sm text-shadow-white dark:text-shadow-black ${showProfileDropdown ? 'rotate-180' : ''}`} />
                </button>

                {/* Profile Dropdown - Enhanced visibility and contrast */}
                {showProfileDropdown && (
                  <div className="absolute right-0 top-14 w-64 sm:w-72 bg-white dark:bg-slate-800 backdrop-blur-xl border-2 border-gray-300 dark:border-slate-600 rounded-xl shadow-2xl dark:shadow-cyan-500/30 z-50">
                    {/* Profile Header */}
                    <div className="p-4 border-b-2 border-gray-300 dark:border-slate-600">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-cyan-400"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-cyan-300 drop-shadow-sm">{user.name}</h3>
                          <p className="text-sm font-medium text-gray-700 dark:text-slate-300">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Profile Options - Enhanced visibility */}
                    <div className="p-2">
                      <button
                        onClick={() => handleProfileAction('profile')}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors group border border-transparent hover:border-cyan-300 dark:hover:border-cyan-500"
                      >
                        <Edit3 className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 drop-shadow-sm" />
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 drop-shadow-sm">Edit Profile</span>
                      </button>
                      
                      <button
                        onClick={() => handleProfileAction('settings')}
                        className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors group border border-transparent hover:border-cyan-300 dark:hover:border-cyan-500"
                      >
                        <Settings className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 drop-shadow-sm" />
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 drop-shadow-sm">Settings</span>
                      </button>

                      {/* Theme Toggle in Settings - Enhanced visibility */}
                      <div className="px-3 py-3 border border-transparent hover:border-cyan-300 dark:hover:border-cyan-500 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {isDark ? <Moon className="w-5 h-5 text-gray-600 dark:text-slate-300 drop-shadow-sm" /> : <Sun className="w-5 h-5 text-gray-600 dark:text-slate-300 drop-shadow-sm" />}
                            <span className="text-sm font-bold text-gray-800 dark:text-slate-200 drop-shadow-sm">Dark Mode</span>
                          </div>
                          <button
                            onClick={toggleTheme}
                            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-lg border-2 ${
                              isDark ? 'bg-cyan-600 border-cyan-400' : 'bg-gray-400 border-gray-300'
                            }`}
                          >
                            <span
                              className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                                isDark ? 'translate-x-6' : 'translate-x-1'
                              }`}
                            />
                          </button>
                        </div>
                      </div>

                      <button
                        className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors group border border-transparent hover:border-cyan-300 dark:hover:border-cyan-500"
                      >
                        <Shield className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 drop-shadow-sm" />
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 drop-shadow-sm">Privacy</span>
                      </button>

                      <button
                        className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-gray-200 dark:hover:bg-slate-700 rounded-lg transition-colors group border border-transparent hover:border-cyan-300 dark:hover:border-cyan-500"
                      >
                        <HelpCircle className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 drop-shadow-sm" />
                        <span className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 drop-shadow-sm">Help & Support</span>
                      </button>

                      <div className="border-t-2 border-gray-300 dark:border-slate-600 mt-2 pt-2">
                        <button
                          onClick={() => handleProfileAction('logout')}
                          className="w-full flex items-center space-x-3 px-3 py-3 text-left hover:bg-red-100 dark:hover:bg-red-500/20 rounded-lg transition-colors group border border-transparent hover:border-red-300 dark:hover:border-red-500"
                        >
                          <LogOut className="w-5 h-5 text-gray-600 dark:text-slate-300 group-hover:text-red-600 dark:group-hover:text-red-400 drop-shadow-sm" />
                          <span className="text-sm font-bold text-gray-800 dark:text-slate-200 group-hover:text-red-600 dark:group-hover:text-red-300 drop-shadow-sm">Logout</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2 md:space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  asChild
                  className="text-gray-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-gray-200 dark:hover:bg-slate-700 border-2 border-gray-400 dark:border-slate-500 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg dark:hover:shadow-cyan-500/20 font-bold tracking-wide text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2 shadow-md"
                >
                  <Link to="/auth">Login</Link>
                </Button>
                <Button 
                  size="sm" 
                  asChild
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 font-bold tracking-wide text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
                >
                  <Link to="/auth">Get Started</Link>
                </Button>
              </div>
            )}
            </div>

            {/* Mobile menu button - Enhanced visibility with responsive sizing */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              className="md:hidden text-gray-800 dark:text-slate-100 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/30 transition-all duration-300 border-2 border-gray-400 dark:border-slate-500 hover:border-cyan-400 w-10 h-10 rounded-xl ml-3 shadow-md"
            >
              {isOpen ? 
                <X className="w-5 h-5 drop-shadow-sm" /> : 
                <Menu className="w-5 h-5 drop-shadow-sm" />
              }
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Enhanced visibility and contrast */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-4 bg-white dark:bg-slate-800 backdrop-blur-xl border-t-2 border-gray-300 dark:border-slate-600 shadow-2xl">
            {/* Mobile nav background glow - enhanced */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/5 to-purple-400/5 pointer-events-none dark:opacity-70 opacity-40"></div>
            
            {/* Navigation Items - Enhanced visibility */}
            <div className="space-y-3">
              {visibleNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`relative flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-bold transition-all duration-300 shadow-md border-2 ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/30 border-cyan-400'
                        : 'text-gray-800 dark:text-slate-200 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 border-gray-300 dark:border-slate-600 hover:border-cyan-400'
                    }`}
                  >
                    <Icon className={`w-6 h-6 transition-all duration-300 drop-shadow-sm ${
                      isActive ? 'text-white' : 'text-gray-700 dark:text-slate-300 group-hover:text-white'
                    }`} />
                    <span className="tracking-wide drop-shadow-sm">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile and Tablet Quick Actions - Enhanced visibility with responsive grid */}
            <div className="border-t-2 border-gray-300 dark:border-slate-600 pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <button
                  onClick={toggleMessageWindow}
                  className="relative flex items-center justify-center space-x-2 md:space-x-3 px-4 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold text-black dark:text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border-2 border-gray-300 dark:border-slate-600 hover:border-cyan-400 shadow-md text-shadow-white dark:text-shadow-black"
                >
                  <MessageSquare className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 drop-shadow-sm" />
                  <span className="tracking-wide drop-shadow-sm text-shadow-white dark:text-shadow-black">Messages</span>
                  {unreadMessages > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                      <span className="text-[10px] md:text-[11px] text-white font-black drop-shadow-sm">{unreadMessages}</span>
                    </div>
                  )}
                </button>

                <button
                  onClick={toggleNotificationWindow}
                  className="relative flex items-center justify-center space-x-2 md:space-x-3 px-4 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold text-black dark:text-white hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 border-2 border-gray-300 dark:border-slate-600 hover:border-cyan-400 shadow-md text-shadow-white dark:text-shadow-black"
                >
                  <Bell className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300 drop-shadow-sm" />
                  <span className="tracking-wide drop-shadow-sm text-shadow-white dark:text-shadow-black">Notifications</span>
                  {unreadNotifications > 0 && (
                    <div className="absolute -top-1.5 -right-1.5 md:-top-2 md:-right-2 w-5 h-5 md:w-6 md:h-6 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-800">
                      <span className="text-[10px] md:text-[11px] text-white font-black drop-shadow-sm">{unreadNotifications}</span>
                    </div>
                  )}
                </button>
              </div>
            </div>
            
            <div className="border-t-2 border-gray-300 dark:border-slate-600 pt-4 mt-4 relative">
              {isAuthenticated ? (
                <div className="space-y-3">
                  {/* Mobile Profile Section - Enhanced visibility */}
                  <div className="flex items-center space-x-3 px-4 py-4 bg-gray-200 dark:bg-slate-700 rounded-xl border-2 border-gray-300 dark:border-slate-600 shadow-md">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-cyan-400"
                    />
                    <div>
                      <p className="text-base font-bold text-black dark:text-white drop-shadow-sm text-shadow-white dark:text-shadow-black">{user.name}</p>
                      <p className="text-sm font-medium text-black dark:text-white text-shadow-white dark:text-shadow-black">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setIsOpen(false)}
                    className="relative flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-bold text-gray-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 group border-2 border-gray-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-md"
                  >
                    <Edit3 className="w-6 h-6 relative z-10 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-sm" />
                    <span className="relative z-10 tracking-wide drop-shadow-sm">Edit Profile</span>
                  </Link>

                  <button
                    className="relative flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-bold text-gray-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 group w-full text-left border-2 border-gray-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 shadow-md"
                  >
                    <Settings className="w-6 h-6 relative z-10 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors duration-300 drop-shadow-sm" />
                    <span className="relative z-10 tracking-wide drop-shadow-sm">Settings</span>
                  </button>

                  {/* Theme toggle for mobile - Enhanced visibility */}
                  <div className="flex items-center justify-between px-4 py-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl hover:border-cyan-400 dark:hover:border-cyan-500 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors shadow-md">
                    <div className="flex items-center space-x-4">
                      {isDark ? <Moon className="w-6 h-6 text-gray-600 dark:text-slate-300 drop-shadow-sm" /> : <Sun className="w-6 h-6 text-gray-600 dark:text-slate-300 drop-shadow-sm" />}
                      <span className="text-base font-bold text-gray-800 dark:text-slate-200 drop-shadow-sm">Dark Mode</span>
                    </div>
                    <button
                      onClick={toggleTheme}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors shadow-lg border-2 ${
                        isDark ? 'bg-cyan-600 border-cyan-400' : 'bg-gray-400 border-gray-300'
                      }`}
                    >
                      <span
                        className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform shadow-md ${
                          isDark ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="relative flex items-center space-x-4 px-4 py-4 rounded-xl text-base font-bold text-gray-800 dark:text-slate-200 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-500/20 w-full text-left transition-all duration-300 group border-2 border-gray-300 dark:border-slate-600 hover:border-red-400 dark:hover:border-red-500 shadow-md"
                  >
                    <LogOut className="w-6 h-6 relative z-10 group-hover:text-red-600 dark:group-hover:text-red-300 transition-colors duration-300 drop-shadow-sm" />
                    <span className="relative z-10 tracking-wide drop-shadow-sm">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 rounded-xl text-base font-bold text-gray-800 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition-all duration-300 border-2 border-gray-300 dark:border-slate-600 hover:border-cyan-400 dark:hover:border-cyan-500 text-center tracking-wide shadow-md"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-cyan-500 to-purple-600 text-white hover:from-cyan-400 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-cyan-500/30 text-center tracking-wide"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
