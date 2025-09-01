import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
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
  ArrowLeft,
  Settings,
  Users
} from 'lucide-react';
import { Button } from '../components/ui/button';

const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Sample chat data
  const [chats, setChats] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How's the coding challenge going?",
      time: "2 min ago",
      unread: 3,
      online: true,
      messages: [
        { id: 1, text: "Hey! How's the coding challenge going?", sender: "other", time: "2 min ago", status: "sent" },
        { id: 2, text: "It's going well! Working on the React components", sender: "me", time: "1 min ago", status: "read" },
        { id: 3, text: "That's awesome! Let me know if you need help", sender: "other", time: "30 sec ago", status: "sent" },
      ]
    },
    {
      id: 2,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b436?w=150&h=150&fit=crop&crop=face",
      lastMessage: "The new feature looks amazing!",
      time: "30 min ago",
      unread: 1,
      online: false,
      messages: [
        { id: 1, text: "The new feature looks amazing!", sender: "other", time: "30 min ago", status: "sent" },
        { id: 2, text: "Thanks! I'm really proud of how it turned out", sender: "me", time: "25 min ago", status: "delivered" },
      ]
    },
    {
      id: 3,
      name: "Development Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Meeting at 3 PM today",
      time: "1 hour ago",
      unread: 0,
      online: true,
      isGroup: true,
      messages: [
        { id: 1, text: "Meeting at 3 PM today", sender: "other", time: "1 hour ago", status: "sent" },
        { id: 2, text: "I'll be there!", sender: "me", time: "55 min ago", status: "read" },
      ]
    },
    {
      id: 4,
      name: "AI Assistant",
      avatar: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "I can help you with coding questions!",
      time: "2 hours ago",
      unread: 0,
      online: true,
      isBot: true,
      messages: [
        { id: 1, text: "I can help you with coding questions!", sender: "other", time: "2 hours ago", status: "sent" },
        { id: 2, text: "What's the best way to optimize React performance?", sender: "me", time: "1 hour ago", status: "read" },
        { id: 3, text: "Here are some key strategies: 1) Use React.memo for components 2) Implement useMemo and useCallback 3) Code splitting with React.lazy", sender: "other", time: "1 hour ago", status: "sent" },
      ]
    }
  ]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
    // Mark messages as read
    setChats(prevChats => 
      prevChats.map(c => 
        c.id === chat.id ? { ...c, unread: 0 } : c
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto h-screen flex">
        
        {/* Chat List Sidebar */}
        <div className={`${selectedChat && isMobile ? 'hidden' : 'flex'} flex-col w-full md:w-1/3 lg:w-1/4 border-r border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800`}>
          
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-slate-700">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Messages</h1>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                  <UserPlus className="w-5 h-5" />
                </Button>
                <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                  <Settings className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-xl text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-500/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex-1 overflow-y-auto">
            {chats.filter(chat => 
              chat.name.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((chat) => (
              <div
                key={chat.id}
                onClick={() => selectChat(chat)}
                className={`flex items-center space-x-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-700/50 cursor-pointer transition-all duration-200 border-b border-gray-100 dark:border-slate-700/50 ${
                  selectedChat?.id === chat.id ? 'bg-cyan-50 dark:bg-slate-700/70 border-l-4 border-l-cyan-500' : ''
                }`}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={chat.avatar}
                    alt={chat.name}
                    className="w-12 h-12 rounded-full border-2 border-gray-200 dark:border-slate-600"
                  />
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
                  )}
                  {chat.isGroup && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <Users className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {chat.isBot && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-xs text-white font-bold">AI</span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">{chat.name}</h3>
                    <span className="text-xs text-gray-500 dark:text-slate-400 flex-shrink-0">{chat.time}</span>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <p className="text-sm text-gray-600 dark:text-slate-400 truncate">{chat.lastMessage}</p>
                    {chat.unread > 0 && (
                      <div className="w-5 h-5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 ml-2">
                        <span className="text-xs text-white font-bold">{chat.unread}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className={`${!selectedChat && isMobile ? 'hidden' : 'flex'} flex-col flex-1 bg-white dark:bg-slate-800`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {isMobile && (
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={() => setSelectedChat(null)}
                        className="text-gray-600 dark:text-slate-400"
                      >
                        <ArrowLeft className="w-5 h-5" />
                      </Button>
                    )}
                    <div className="relative">
                      <img
                        src={selectedChat.avatar}
                        alt={selectedChat.name}
                        className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-slate-600"
                      />
                      {selectedChat.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white dark:border-slate-800 rounded-full"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{selectedChat.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-slate-400">
                        {selectedChat.online ? 'Online' : 'Last seen recently'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                      <Phone className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                      <Video className="w-5 h-5" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-900/50">
                {selectedChat.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg'
                          : 'bg-white dark:bg-slate-700 text-gray-900 dark:text-slate-200 border border-gray-200 dark:border-slate-600 shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-2 ${
                        message.sender === 'me' ? 'text-white/70' : 'text-gray-500 dark:text-slate-400'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.sender === 'me' && (
                          <div className="flex">
                            {message.status === 'sent' && <Check className="w-3 h-3" />}
                            {message.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                            {message.status === 'read' && <CheckCheck className="w-3 h-3 text-cyan-300" />}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800">
                <div className="flex items-center space-x-3">
                  <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                    <Paperclip className="w-5 h-5" />
                  </Button>
                  
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type a message..."
                      rows={1}
                      className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-700 border border-gray-200 dark:border-slate-600 rounded-full text-gray-900 dark:text-slate-200 placeholder-gray-400 dark:placeholder-slate-400 focus:outline-none focus:border-cyan-500 dark:focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 dark:focus:ring-cyan-500/20 resize-none transition-all duration-300"
                      style={{ minHeight: '48px', maxHeight: '120px' }}
                    />
                  </div>
                  
                  <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                    <Smile className="w-5 h-5" />
                  </Button>
                  
                  {messageText.trim() ? (
                    <Button 
                      size="icon"
                      onClick={sendMessage}
                      className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-lg"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  ) : (
                    <Button size="icon" variant="ghost" className="text-gray-600 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400">
                      <Mic className="w-5 h-5" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            /* No Chat Selected */
            <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-slate-900/50">
              <div className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Welcome to Messages</h3>
                <p className="text-gray-600 dark:text-slate-400 max-w-sm">
                  Select a conversation from the sidebar to start chatting with your coding community.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
