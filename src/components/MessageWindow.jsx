import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Phone, 
  Video, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile,
  X,
  ArrowLeft,
  Check,
  CheckCheck,
  MessageSquare
} from 'lucide-react';

const MessageWindow = ({ isOpen, onClose }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  // Sample chat data
  const [chats] = useState([
    {
      id: 1,
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Hey! How's the coding challenge going?",
      time: "2:30 PM",
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Thanks for the help with React!",
      time: "1:45 PM",
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: "Tech Mentors",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face",
      lastMessage: "New resources available in the group",
      time: "12:20 PM",
      unread: 5,
      online: false,
      isGroup: true
    },
    {
      id: 4,
      name: "David Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Let's schedule a code review session",
      time: "11:30 AM",
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
      lastMessage: "Great job on the algorithm solution!",
      time: "Yesterday",
      unread: 1,
      online: true
    }
  ]);

  // Sample messages for selected chat
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        text: "Hey! How's the coding challenge going?",
        sender: "Alex Johnson",
        time: "2:25 PM",
        isOwn: false,
        status: "read"
      },
      {
        id: 2,
        text: "It's going great! Just finished the sorting algorithm part.",
        sender: "You",
        time: "2:28 PM",
        isOwn: true,
        status: "read"
      },
      {
        id: 3,
        text: "That's awesome! Which approach did you use?",
        sender: "Alex Johnson",
        time: "2:30 PM",
        isOwn: false,
        status: "read"
      }
    ],
    2: [
      {
        id: 1,
        text: "Thanks for the help with React hooks!",
        sender: "Sarah Wilson",
        time: "1:40 PM",
        isOwn: false,
        status: "read"
      },
      {
        id: 2,
        text: "You're welcome! useState and useEffect can be tricky at first.",
        sender: "You",
        time: "1:42 PM",
        isOwn: true,
        status: "read"
      },
      {
        id: 3,
        text: "Thanks for the help with React!",
        sender: "Sarah Wilson",
        time: "1:45 PM",
        isOwn: false,
        status: "read"
      }
    ]
  });

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedChat) return;

    const newMessage = {
      id: Date.now(),
      text: messageInput,
      sender: "You",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: "sent"
    };

    setMessages(prev => ({
      ...prev,
      [selectedChat.id]: [...(prev[selectedChat.id] || []), newMessage]
    }));

    setMessageInput('');
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChat]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm">
      <div className="absolute top-4 right-4 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-green-500 to-green-600 text-white">
          <h3 className="font-semibold text-lg">Messages</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex h-[calc(100%-64px)]">
          {/* Chat List */}
          <div className={`${selectedChat ? 'hidden lg:block lg:w-1/2' : 'w-full'} border-r border-gray-200 dark:border-gray-700 flex flex-col`}>
            {/* Search */}
            <div className="p-3 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black dark:text-white w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                />
              </div>
            </div>

            {/* Chat List */}
            <div className="flex-1 overflow-y-auto">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`flex items-center p-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                    selectedChat?.id === chat.id ? 'bg-green-50 dark:bg-green-900/20 border-r-2 border-green-500' : ''
                  }`}
                >
                  <div className="relative">
                    <img
                      src={chat.avatar}
                      alt={chat.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {chat.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></div>
                    )}
                  </div>
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900 dark:text-white truncate">
                        {chat.name}
                      </h4>
                      <span className="text-xs text-black dark:text-white text-shadow-white dark:text-shadow-black">
                        {chat.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="text-sm text-black dark:text-white truncate flex-1 text-shadow-white dark:text-shadow-black">
                        {chat.lastMessage}
                      </p>
                      {chat.unread > 0 && (
                        <span className="ml-2 bg-green-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          {selectedChat ? (
            <div className={`${selectedChat ? 'w-full lg:w-1/2' : 'hidden'} flex flex-col`}>
              {/* Chat Header */}
              <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                <button
                  onClick={() => setSelectedChat(null)}
                  className="lg:hidden mr-3 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
                <img
                  src={selectedChat.avatar}
                  alt={selectedChat.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="ml-3 flex-1">
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {selectedChat.name}
                  </h4>
                  <p className="text-sm text-black dark:text-white text-shadow-white dark:text-shadow-black">
                    {selectedChat.online ? 'Online' : 'Last seen recently'}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                    <Phone className="w-5 h-5 text-black dark:text-white" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                    <Video className="w-5 h-5 text-black dark:text-white" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full">
                    <MoreVertical className="w-5 h-5 text-black dark:text-white" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-800">
                {(messages[selectedChat.id] || []).map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-sm px-4 py-2 rounded-2xl ${
                        message.isOwn
                          ? 'bg-green-500 text-white rounded-br-md'
                          : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                      } shadow-sm`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <div className={`flex items-center justify-end mt-1 space-x-1 ${
                        message.isOwn ? 'text-green-100' : 'text-black dark:text-white text-shadow-white dark:text-shadow-black'
                      }`}>
                        <span className="text-xs">{message.time}</span>
                        {message.isOwn && (
                          <div className="text-green-100">
                            {message.status === 'read' ? (
                              <CheckCheck className="w-4 h-4" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                  <button
                    type="button"
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
                  >
                    <Paperclip className="w-5 h-5 text-black dark:text-white" />
                  </button>
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type a message..."
                      className="w-full px-4 py-2 pr-10 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Smile className="w-5 h-5 text-black dark:text-white" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="p-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="hidden lg:flex lg:w-1/2 items-center justify-center bg-gray-50 dark:bg-gray-800">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-12 h-12 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  WhatsApp Web
                </h3>
                <p className="text-gray-600 dark:text-gray-400 max-w-sm">
                  Send and receive messages without keeping your phone online.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageWindow;
