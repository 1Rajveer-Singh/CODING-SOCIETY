import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Bell,
  Settings,
  Filter,
  Search,
  Check,
  CheckCheck,
  Trash2,
  Archive,
  Star,
  MessageSquare,
  Trophy,
  Shield,
  Users,
  Code,
  Calendar,
  Gift,
  AlertCircle,
  Info,
  ArrowLeft
} from 'lucide-react';
import { Button } from '../components/ui/button';

const NotificationsPage = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "message",
      title: "New message from Alex Johnson",
      description: "Hey! How's the coding challenge going? I saw your latest commit and it looks amazing!",
      time: "2 min ago",
      unread: true,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      action: "Reply",
      actionUrl: "/messages"
    },
    {
      id: 2,
      type: "system",
      title: "Code review completed",
      description: "Your pull request #123 'Implement user authentication' has been approved and merged to main branch.",
      time: "1 hour ago",
      unread: true,
      icon: "check",
      action: "View PR",
      actionUrl: "#"
    },
    {
      id: 3,
      type: "achievement",
      title: "New badge earned!",
      description: "Congratulations! You've completed 10 coding challenges and earned the 'Problem Solver' badge.",
      time: "3 hours ago",
      unread: false,
      icon: "trophy",
      action: "View Profile",
      actionUrl: "/profile"
    },
    {
      id: 4,
      type: "message",
      title: "Sarah Chen mentioned you",
      description: "Great work on the React components! @you really nailed the responsive design.",
      time: "5 hours ago",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=150&h=150&fit=crop&crop=face",
      action: "View Comment",
      actionUrl: "#"
    },
    {
      id: 5,
      type: "system",
      title: "Weekly coding challenge",
      description: "New challenge available: 'Build a Real-time Chat Application'. Difficulty: Intermediate",
      time: "1 day ago",
      unread: false,
      icon: "code",
      action: "Start Challenge",
      actionUrl: "/coding"
    },
    {
      id: 6,
      type: "social",
      title: "Join upcoming webinar",
      description: "React Performance Optimization - Join us tomorrow at 2 PM PST with industry experts.",
      time: "1 day ago",
      unread: false,
      icon: "calendar",
      action: "Register",
      actionUrl: "#"
    },
    {
      id: 7,
      type: "achievement",
      title: "Milestone reached!",
      description: "You've reached 1000 lines of code this month. Keep up the excellent work!",
      time: "2 days ago",
      unread: false,
      icon: "star",
      action: "View Stats",
      actionUrl: "/profile"
    },
    {
      id: 8,
      type: "message",
      title: "Development Team",
      description: "Team meeting scheduled for tomorrow at 3 PM. Please review the agenda in advance.",
      time: "2 days ago",
      unread: false,
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      action: "View Calendar",
      actionUrl: "#"
    },
    {
      id: 9,
      type: "system",
      title: "Security update",
      description: "Your account security has been enhanced with two-factor authentication.",
      time: "3 days ago",
      unread: false,
      icon: "shield",
      action: "Manage Security",
      actionUrl: "#"
    },
    {
      id: 10,
      type: "social",
      title: "New community feature",
      description: "Introducing Code Reviews! Get feedback from experienced developers on your projects.",
      time: "1 week ago",
      unread: false,
      icon: "users",
      action: "Learn More",
      actionUrl: "#"
    }
  ]);

  const filters = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => n.unread).length },
    { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length },
    { id: 'achievement', label: 'Achievements', count: notifications.filter(n => n.type === 'achievement').length },
    { id: 'social', label: 'Social', count: notifications.filter(n => n.type === 'social').length }
  ];

  const getFilteredNotifications = () => {
    let filtered = notifications;
    
    if (selectedFilter !== 'all') {
      if (selectedFilter === 'unread') {
        filtered = filtered.filter(n => n.unread);
      } else {
        filtered = filtered.filter(n => n.type === selectedFilter);
      }
    }
    
    if (searchQuery) {
      filtered = filtered.filter(n => 
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, unread: false }))
    );
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    );
  };

  const getNotificationIcon = (notification) => {
    if (notification.avatar) {
      return (
        <img
          src={notification.avatar}
          alt=""
          className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-slate-600"
        />
      );
    }

    const iconClass = "w-6 h-6 text-white";
    const bgClass = (() => {
      switch (notification.type) {
        case 'message': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
        case 'system': return 'bg-gradient-to-r from-green-500 to-emerald-500';
        case 'achievement': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
        case 'social': return 'bg-gradient-to-r from-purple-500 to-pink-500';
        default: return 'bg-gradient-to-r from-gray-500 to-slate-500';
      }
    })();

    const IconComponent = (() => {
      switch (notification.icon) {
        case 'check': return Check;
        case 'trophy': return Trophy;
        case 'star': return Star;
        case 'code': return Code;
        case 'calendar': return Calendar;
        case 'shield': return Shield;
        case 'users': return Users;
        case 'gift': return Gift;
        default: return Bell;
      }
    })();

    return (
      <div className={`w-10 h-10 rounded-full ${bgClass} flex items-center justify-center shadow-lg`}>
        <IconComponent className={iconClass} />
      </div>
    );
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'message': return 'text-blue-600 dark:text-blue-400';
      case 'system': return 'text-green-600 dark:text-green-400';
      case 'achievement': return 'text-yellow-600 dark:text-yellow-400';
      case 'social': return 'text-purple-600 dark:text-purple-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-6">
            <Link to="/" className="lg:hidden">
              <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Notifications</h1>
              <p className="text-gray-600 dark:text-slate-400 mt-1">Stay updated with your coding community</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button 
                variant="ghost" 
                onClick={markAllAsRead}
                className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400"
              >
                <CheckCheck className="w-4 h-4 mr-2" />
                Mark all read
              </Button>
              <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-slate-500" />
            <input
              type="text"
              placeholder="Search notifications..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-500/20 transition-all duration-300"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={selectedFilter === filter.id ? "default" : "ghost"}
                size="sm"
                onClick={() => setSelectedFilter(filter.id)}
                className={`${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                } transition-all duration-300`}
              >
                {filter.label}
                {filter.count > 0 && (
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                    selectedFilter === filter.id
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-400'
                  }`}>
                    {filter.count}
                  </span>
                )}
              </Button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {getFilteredNotifications().length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-16 h-16 text-gray-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No notifications found</h3>
              <p className="text-gray-600 dark:text-slate-400">
                {searchQuery ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
              </p>
            </div>
          ) : (
            getFilteredNotifications().map((notification) => (
              <div
                key={notification.id}
                className={`bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-cyan-500/10 transition-all duration-300 ${
                  notification.unread ? 'ring-2 ring-cyan-200 dark:ring-cyan-500/20' : ''
                }`}
              >
                <div className="flex items-start space-x-4">
                  {/* Icon/Avatar */}
                  <div className="flex-shrink-0">
                    {getNotificationIcon(notification)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                            {notification.title}
                          </h3>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                          )}
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getTypeColor(notification.type)} bg-opacity-10`}>
                            {notification.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed mb-2">
                          {notification.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500 dark:text-slate-500">
                            {notification.time}
                          </span>
                          {notification.action && (
                            <Link
                              to={notification.actionUrl}
                              className="text-xs font-medium text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
                            >
                              {notification.action}
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 ml-4">
                        {notification.unread && (
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            className="w-8 h-8 text-gray-400 hover:text-cyan-600 dark:hover:text-cyan-400"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          className="w-8 h-8 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More */}
        {getFilteredNotifications().length > 0 && (
          <div className="text-center mt-8">
            <Button variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
              Load more notifications
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
