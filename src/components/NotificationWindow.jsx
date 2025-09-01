import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Check, 
  Trash2, 
  Settings,
  MessageSquare,
  Heart,
  UserPlus,
  Award,
  Clock
} from 'lucide-react';

const NotificationWindow = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'message',
      title: 'New Message',
      description: 'Alex Johnson sent you a message',
      time: '2 minutes ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 2,
      type: 'like',
      title: 'Post Liked',
      description: 'Sarah Wilson liked your coding solution',
      time: '15 minutes ago',
      isRead: false,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 3,
      type: 'follow',
      title: 'New Follower',
      description: 'David Chen started following you',
      time: '1 hour ago',
      isRead: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: 4,
      type: 'achievement',
      title: 'Achievement Unlocked',
      description: 'You completed the JavaScript Fundamentals course!',
      time: '2 hours ago',
      isRead: true,
      avatar: null
    },
    {
      id: 5,
      type: 'reminder',
      title: 'Quiz Reminder',
      description: 'Your React Quiz starts in 30 minutes',
      time: '3 hours ago',
      isRead: true,
      avatar: null
    }
  ]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-5 h-5 text-blue-500" />;
      case 'like':
        return <Heart className="w-5 h-5 text-red-500" />;
      case 'follow':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'achievement':
        return <Award className="w-5 h-5 text-yellow-500" />;
      case 'reminder':
        return <Clock className="w-5 h-5 text-purple-500" />;
      default:
        return <Bell className="w-5 h-5 text-black dark:text-white" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="absolute top-4 right-4 w-96 max-h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <h3 className="font-semibold text-lg">Notifications</h3>
            {unreadCount > 0 && (
              <span className="bg-white/20 text-white text-xs rounded-full px-2 py-0.5">
                {unreadCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <button
              onClick={markAllAsRead}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 font-medium"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto max-h-[500px]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-8 h-8 text-black dark:text-white" />
              </div>
              <h4 className="text-lg font-medium text-black dark:text-white mb-2 text-shadow-white dark:text-shadow-black">
                No notifications
              </h4>
              <p className="text-black dark:text-white text-center text-shadow-white dark:text-shadow-black">
                You're all caught up! No new notifications.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    !notification.isRead ? 'bg-blue-50 dark:bg-blue-900/10' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar or Icon */}
                    <div className="flex-shrink-0">
                      {notification.avatar ? (
                        <img
                          src={notification.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className={`text-sm font-medium ${
                            !notification.isRead 
                              ? 'text-black dark:text-white' 
                              : 'text-black dark:text-white'
                          }`}>
                            {notification.title}
                          </h4>
                          <p className={`text-sm mt-1 ${
                            !notification.isRead 
                              ? 'text-black dark:text-white' 
                              : 'text-black dark:text-white'
                          }`}>
                            {notification.description}
                          </p>
                          <p className="text-xs text-black dark:text-white mt-2">
                            {notification.time}
                          </p>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center space-x-1 ml-2">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                              title="Mark as read"
                            >
                              <Check className="w-4 h-4 text-black dark:text-white" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4 text-black dark:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-black dark:text-white hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="w-4 h-4" />
            <span>Notification Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationWindow;
