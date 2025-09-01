import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useAuth } from '../context/AuthContext';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Bookmark,
  Search,
  Filter,
  Plus,
  Code,
  Image,
  FileText,
  MoreHorizontal,
  UserPlus,
  TrendingUp,
  Users,
  Star,
  Eye,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Send,
  X,
  Edit3,
  Trash2,
  Flag,
  Copy,
  ExternalLink,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  RefreshCw,
  Calendar,
  Clock,
  MapPin,
  Link as LinkIcon,
  Hash,
  Zap,
  Award,
  Target,
  Lightbulb,
  Code2,
  Terminal,
  Database,
  Cpu,
  Globe,
  Smartphone,
  Settings,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  Upload,
  Mic,
  Video,
  Smile,
  AtSign,
  Lock,
  Unlock,
  Repeat,
  ArrowUp,
  ArrowDown,
  Filter as FilterIcon,
  SortAsc,
  SortDesc,
  Grid,
  List,
  BarChart3
} from 'lucide-react';

const FeedPage = () => {
  const { user } = useAuth();
  
  // Enhanced state management
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('feed');
  const [sortBy, setSortBy] = useState('recent');
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [viewMode, setViewMode] = useState('cards');
  const [selectedTags, setSelectedTags] = useState([]);
  const [postMode, setPostMode] = useState('text');
  const [codeLanguage, setCodeLanguage] = useState('javascript');
  const [pollOptions, setPollOptions] = useState(['', '']);
  const [mediaFiles, setMediaFiles] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [trendingTags, setTrendingTags] = useState([]);
  const [suggestedUsers, setSuggestedUsers] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [mentions, setMentions] = useState([]);
  const [showMentions, setShowMentions] = useState(false);
  const [postPrivacy, setPostPrivacy] = useState('public');
  const [scheduledTime, setScheduledTime] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  
  const fileInputRef = useRef(null);
  const videoRefs = useRef({});
  const textareaRef = useRef(null);
  const observerRef = useRef(null);

  // Mock data
  const mockPosts = [
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
        role: 'Senior Frontend Developer',
        company: 'Tech Corp',
        isFollowing: false,
        isVerified: true,
        followers: 15420,
        following: 892,
        level: 'Expert',
        badges: ['Frontend Master', 'React Expert']
      },
      content: 'Just built an amazing React app with TypeScript! The type safety is incredible and catches so many errors during development. Here are some advanced patterns I discovered...',
      type: 'code',
      timestamp: '2 hours ago',
      readTime: '5 min read',
      likes: 2340,
      comments: 145,
      shares: 120,
      views: 8920,
      saves: 340,
      isLiked: false,
      isBookmarked: false,
      tags: ['React', 'TypeScript', 'Frontend'],
      codeSnippet: `// Advanced React Component with TypeScript
interface UserProps {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<UserProps> = ({ id, name, email }) => {
  const [userData, setUserData] = useState<UserProps | null>(null);
  
  useEffect(() => {
    fetchUserData(id);
  }, [id]);
  
  return (
    <div className="user-profile">
      <h1>{name}</h1>
      <p>{email}</p>
    </div>
  );
};`,
      commentsData: [
        {
          id: 1,
          author: { 
            name: 'Alex Kumar', 
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex' 
          },
          content: 'This is exactly what I needed! Thanks for sharing.',
          timestamp: '1 hour ago',
          likes: 23,
          replies: []
        }
      ]
    },
    {
      id: 2,
      author: {
        name: 'Alex Kumar',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
        role: 'ML Engineer',
        company: 'AI Innovations',
        isFollowing: true,
        isVerified: true,
        followers: 28930,
        level: 'Expert',
        badges: ['ML Expert', 'Python Master']
      },
      content: 'Machine Learning model deployment best practices. Just deployed my first ML model to production using Docker and FastAPI...',
      type: 'article',
      timestamp: '5 hours ago',
      readTime: '12 min read',
      likes: 1560,
      comments: 234,
      shares: 89,
      views: 12340,
      saves: 567,
      isLiked: true,
      isBookmarked: true,
      tags: ['MachineLearning', 'Python', 'Docker', 'FastAPI'],
      image: 'https://via.placeholder.com/800x400/4f46e5/ffffff?text=ML+Model+Architecture',
      commentsData: []
    }
  ];

  const trendingTagsData = [
    { tag: 'React', posts: 2340, trend: '+12%' },
    { tag: 'TypeScript', posts: 1890, trend: '+8%' },
    { tag: 'Python', posts: 1560, trend: '+15%' },
    { tag: 'MachineLearning', posts: 1230, trend: '+22%' },
    { tag: 'WebDev', posts: 980, trend: '+5%' }
  ];

  const suggestedUsersData = [
    {
      id: 1,
      name: 'Emma Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      role: 'Full Stack Developer',
      followers: 8920,
      mutualConnections: 12,
      isVerified: true
    },
    {
      id: 2,
      name: 'David Park',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      role: 'DevOps Engineer',
      followers: 5670,
      mutualConnections: 8,
      isVerified: false
    }
  ];

  // Enhanced initialization
  useEffect(() => {
    const initializeFeed = async () => {
      setIsLoading(true);
      
      await Promise.all([
        loadPosts(),
        loadTrendingTags(),
        loadSuggestedUsers(),
        loadRecentActivity()
      ]);
      
      setIsLoading(false);
    };

    initializeFeed();
  }, []);

  const loadPosts = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    setPosts(mockPosts);
  };

  const loadTrendingTags = async () => {
    setTrendingTags(trendingTagsData);
  };

  const loadSuggestedUsers = async () => {
    setSuggestedUsers(suggestedUsersData);
  };

  const loadRecentActivity = async () => {
    const activity = [
      { type: 'like', user: 'Alex Kumar', post: 'React Performance Tips', time: '5 min ago' },
      { type: 'comment', user: 'Sarah Chen', post: 'TypeScript Best Practices', time: '12 min ago' },
      { type: 'follow', user: 'Emma Wilson', time: '25 min ago' }
    ];
    setRecentActivity(activity);
  };

  // Enhanced handlers
  const handleLike = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  }, []);

  const handleBookmark = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isBookmarked: !post.isBookmarked,
            saves: post.isBookmarked ? post.saves - 1 : post.saves + 1
          }
        : post
    ));
    
    showNotification(
      posts.find(p => p.id === postId)?.isBookmarked 
        ? 'Removed from bookmarks' 
        : 'Added to bookmarks', 
      'success'
    );
  }, [posts]);

  const handleFollow = useCallback((postId) => {
    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            author: { 
              ...post.author, 
              isFollowing: !post.author.isFollowing,
              followers: post.author.isFollowing 
                ? post.author.followers - 1 
                : post.author.followers + 1
            }
          }
        : post
    ));
  }, []);

  const handleShare = useCallback(async (postId, shareType = 'link') => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const shareData = {
      title: `Post by ${post.author.name}`,
      text: post.content.substring(0, 100) + '...',
      url: `${window.location.origin}/post/${postId}`
    };

    try {
      switch (shareType) {
        case 'native':
          if (navigator.share) {
            await navigator.share(shareData);
          } else {
            await navigator.clipboard.writeText(shareData.url);
            showNotification('Link copied to clipboard!', 'success');
          }
          break;
        case 'copy':
          await navigator.clipboard.writeText(shareData.url);
          showNotification('Link copied to clipboard!', 'success');
          break;
        case 'twitter':
          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareData.text)}&url=${encodeURIComponent(shareData.url)}`);
          break;
        case 'linkedin':
          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`);
          break;
      }

      // Update share count
      setPosts(prevPosts => prevPosts.map(post => 
        post.id === postId ? { ...post, shares: post.shares + 1 } : post
      ));
      
    } catch (error) {
      showNotification('Failed to share post', 'error');
    }
  }, [posts]);

  const handleComment = useCallback((postId, commentText) => {
    if (!commentText.trim()) return;

    const newCommentObj = {
      id: Date.now(),
      author: { 
        name: user.name, 
        avatar: user.avatar 
      },
      content: commentText,
      timestamp: 'Just now',
      likes: 0,
      replies: []
    };

    setPosts(prevPosts => prevPosts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            comments: post.comments + 1,
            commentsData: [...(post.commentsData || []), newCommentObj]
          }
        : post
    ));

    setNewComment(prev => ({ ...prev, [postId]: '' }));
    showNotification('Comment added successfully!', 'success');
  }, [user]);

  const handleMediaUpload = useCallback(async (files) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);

    const fileArray = Array.from(files);
    const mediaPromises = fileArray.map((file, index) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const progress = ((index + (e.loaded / e.total)) / fileArray.length) * 100;
            setUploadProgress(Math.round(progress));
          }
        };
        reader.onload = (e) => {
          resolve({
            type: file.type.startsWith('image/') ? 'image' : 
                  file.type.startsWith('video/') ? 'video' : 'file',
            url: e.target.result,
            name: file.name,
            size: file.size,
            id: Date.now() + index
          });
        };
        reader.readAsDataURL(file);
      });
    });

    try {
      const uploadedMedia = await Promise.all(mediaPromises);
      setMediaFiles(prev => [...prev, ...uploadedMedia]);
      showNotification('Media uploaded successfully!', 'success');
    } catch (error) {
      showNotification('Failed to upload media', 'error');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, []);

  const handleNewPost = useCallback(() => {
    if (!newPost.trim() && mediaFiles.length === 0) return;
    
    const post = {
      id: Date.now(),
      author: {
        name: user.name,
        avatar: user.avatar,
        role: user.role || 'Developer',
        company: user.company || 'Independent',
        isFollowing: false,
        isVerified: user.isVerified || false,
        followers: user.followers || 0,
        following: user.following || 0,
        level: user.level || 'Beginner',
        badges: user.badges || []
      },
      content: newPost,
      type: postMode,
      timestamp: 'Just now',
      readTime: Math.ceil(newPost.length / 200) + ' min read',
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      saves: 0,
      isLiked: false,
      isBookmarked: false,
      tags: selectedTags,
      media: mediaFiles,
      commentsData: []
    };
    
    setPosts(prevPosts => [post, ...prevPosts]);
    setNewPost('');
    setMediaFiles([]);
    setSelectedTags([]);
    setPostMode('text');
    
    showNotification('Post created successfully!', 'success');
  }, [newPost, mediaFiles, selectedTags, postMode, user]);

  const toggleComments = useCallback((postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await loadPosts();
    await loadTrendingTags();
    setIsRefreshing(false);
    showNotification('Feed refreshed!', 'success');
  }, []);

  const removeMedia = useCallback((index) => {
    setMediaFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const showNotification = useCallback((message, type = 'info') => {
    const notification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [notification, ...prev.slice(0, 4)]);
    
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== notification.id));
    }, 5000);
  }, []);

  // Enhanced filtering
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesFilter = (() => {
      switch (activeTab) {
        case 'following':
          return post.author.isFollowing;
        case 'trending':
          return post.likes > 500 || post.views > 5000;
        case 'bookmarks':
          return post.isBookmarked;
        default:
          return true;
      }
    })();

    const matchesTags = selectedTags.length === 0 || 
                       selectedTags.some(tag => post.tags.includes(tag));
    
    return matchesSearch && matchesFilter && matchesTags;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares);
      case 'recent':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'most-liked':
        return b.likes - a.likes;
      default:
        return 0;
    }
  });

  // Enhanced PostCard component
  const PostCard = ({ post }) => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [showShareMenu, setShowShareMenu] = useState(false);

    const contentPreview = post.content.length > 300 ? 
      post.content.substring(0, 300) + '...' : post.content;

    return (
      <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex gap-3">
              <div className="relative">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                />
                {post.author.isVerified && (
                  <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg hover:text-blue-600 cursor-pointer transition-colors">
                    {post.author.name}
                  </CardTitle>
                  <span className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-1 rounded-full">
                    {post.author.level}
                  </span>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <span>{post.author.role}</span>
                  {post.author.company && (
                    <>
                      <span>•</span>
                      <span>{post.author.company}</span>
                    </>
                  )}
                  <span>•</span>
                  <span>{post.timestamp}</span>
                  {post.readTime && (
                    <>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </span>
                    </>
                  )}
                </CardDescription>
                
                {post.author.badges && post.author.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1">
                    {post.author.badges.slice(0, 3).map((badge, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white px-2 py-0.5 rounded-full"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex gap-2">
              {!post.author.isFollowing && post.author.name !== user.name && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleFollow(post.id)}
                  className="hover:bg-blue-50 hover:border-blue-300 transition-colors"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Follow
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Post content */}
          <div className="mb-4">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {showFullContent ? post.content : contentPreview}
            </p>
            {post.content.length > 300 && (
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="text-blue-600 hover:text-blue-700 text-sm mt-2 font-medium"
              >
                {showFullContent ? 'Show less' : 'Show more'}
              </button>
            )}
          </div>
          
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTags(prev => 
                    prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
                  )}
                  className={`px-3 py-1 text-sm rounded-full transition-all duration-200 hover:scale-105 ${
                    selectedTags.includes(tag)
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
          
          {/* Media */}
          {post.media && post.media.length > 0 && (
            <div className="mb-4">
              {post.media.map((media, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden mb-2">
                  {media.type === 'image' ? (
                    <img
                      src={media.url}
                      alt="Post media"
                      className="w-full h-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                    />
                  ) : (
                    <video
                      src={media.url}
                      className="w-full h-auto rounded-lg"
                      controls
                      preload="metadata"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Image */}
          {post.image && (
            <img
              src={post.image}
              alt="Post content"
              className="w-full rounded-lg mb-4 cursor-pointer hover:opacity-90 transition-opacity"
            />
          )}
          
          {/* Code Snippet */}
          {post.codeSnippet && (
            <div className="relative mb-4">
              <div className="flex items-center justify-between bg-gray-800 px-4 py-2 rounded-t-lg">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-400">TypeScript</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    navigator.clipboard.writeText(post.codeSnippet);
                    showNotification('Code copied to clipboard!', 'success');
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-b-lg overflow-x-auto">
                <pre className="text-sm leading-relaxed">
                  <code>{post.codeSnippet}</code>
                </pre>
              </div>
            </div>
          )}
          
          {/* Engagement Stats */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              <span>5.8% engagement</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>{post.views.toLocaleString()} reach</span>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-6">
              <button
                onClick={() => handleLike(post.id)}
                className={`flex items-center gap-2 text-sm transition-all duration-200 hover:scale-105 ${
                  post.isLiked
                    ? 'text-red-500 hover:text-red-600'
                    : 'text-gray-500 hover:text-red-500'
                }`}
              >
                <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
                <span className="font-medium">{post.likes.toLocaleString()}</span>
              </button>
              
              <button
                onClick={() => toggleComments(post.id)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-all duration-200 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span className="font-medium">{post.comments.toLocaleString()}</span>
              </button>
              
              {/* Share Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-all duration-200 hover:scale-105"
                >
                  <Share2 className="w-5 h-5" />
                  <span className="font-medium">{post.shares.toLocaleString()}</span>
                </button>
                
                {showShareMenu && (
                  <div className="absolute bottom-full left-0 mb-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-10">
                    <div className="p-3">
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            handleShare(post.id, 'copy');
                            setShowShareMenu(false);
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                        >
                          <Copy className="w-4 h-4" />
                          Copy link
                        </button>
                        <button
                          onClick={() => {
                            handleShare(post.id, 'twitter');
                            setShowShareMenu(false);
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => {
                            handleShare(post.id, 'linkedin');
                            setShowShareMenu(false);
                          }}
                          className="w-full text-left flex items-center gap-2 p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700 text-sm"
                        >
                          <ExternalLink className="w-4 h-4" />
                          LinkedIn
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <button
              onClick={() => handleBookmark(post.id)}
              className={`text-sm transition-all duration-200 hover:scale-105 p-2 rounded-full ${
                post.isBookmarked
                  ? 'text-yellow-500 hover:text-yellow-600 bg-yellow-50 dark:bg-yellow-900/20'
                  : 'text-gray-500 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20'
              }`}
            >
              <Bookmark className={`w-5 h-5 ${post.isBookmarked ? 'fill-current' : ''}`} />
            </button>
          </div>
          
          {/* Comments Section */}
          {showComments[post.id] && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="space-y-3 mb-4">
                {post.commentsData && post.commentsData.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <img
                      src={comment.author.avatar}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-gray-500">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <button className="text-xs text-gray-500 hover:text-blue-500 flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          {comment.likes}
                        </button>
                        <button className="text-xs text-gray-500 hover:text-blue-500">
                          Reply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Add comment */}
              <div className="flex gap-3">
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-8 h-8 rounded-full"
                />
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Write a thoughtful comment..."
                    value={newComment[post.id] || ''}
                    onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleComment(post.id, newComment[post.id]);
                      }
                    }}
                    className="flex-1"
                  />
                  <Button
                    size="sm"
                    onClick={() => handleComment(post.id, newComment[post.id])}
                    disabled={!newComment[post.id]?.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  if (isLoading) {
    return (
      <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent mx-auto mb-4"></div>
            <div className="absolute inset-0 rounded-full h-16 w-16 border-4 border-purple-400 border-t-transparent mx-auto animate-pulse"></div>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">Loading your personalized feed...</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Fetching the latest updates from your network</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Notifications */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg border ${
                notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
                notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
                'bg-blue-50 border-blue-200 text-blue-800'
              } animate-slide-in`}
            >
              <div className="flex items-center gap-2">
                {notification.type === 'success' && <CheckCircle className="w-4 h-4" />}
                {notification.type === 'error' && <AlertCircle className="w-4 h-4" />}
                {notification.type === 'info' && <Info className="w-4 h-4" />}
                <span className="text-sm font-medium">{notification.message}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Feed
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Stay updated with the latest from your coding community • {posts.length} posts
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Trending Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-orange-500" />
                  Trending Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {trendingTags.slice(0, 6).map((tag, index) => (
                    <div key={tag.tag} className="flex items-center justify-between">
                      <button
                        onClick={() => setSelectedTags(prev => 
                          prev.includes(tag.tag) ? prev.filter(t => t !== tag.tag) : [...prev, tag.tag]
                        )}
                        className={`text-sm hover:text-blue-600 transition-colors ${
                          selectedTags.includes(tag.tag) ? 'text-blue-600 font-medium' : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        #{tag.tag}
                      </button>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{tag.posts.toLocaleString()} posts</div>
                        <div className="text-xs text-green-600">{tag.trend}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Suggested Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="w-5 h-5 text-green-500" />
                  Suggested for you
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestedUsers.map((suggestedUser) => (
                    <div key={suggestedUser.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={suggestedUser.avatar}
                            alt={suggestedUser.name}
                            className="w-10 h-10 rounded-full"
                          />
                          {suggestedUser.isVerified && (
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5">
                              <Star className="w-2.5 h-2.5 text-white" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{suggestedUser.name}</p>
                          <p className="text-xs text-gray-500">{suggestedUser.role}</p>
                          <p className="text-xs text-gray-400">
                            {suggestedUser.mutualConnections} mutual connections
                          </p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">
                        Follow
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2">
                        {activity.type === 'like' && <Heart className="w-3 h-3 text-red-500" />}
                        {activity.type === 'comment' && <MessageCircle className="w-3 h-3 text-blue-500" />}
                        {activity.type === 'follow' && <UserPlus className="w-3 h-3 text-green-500" />}
                        <span className="text-gray-700 dark:text-gray-300">
                          <span className="font-medium">{activity.user}</span>
                          {activity.type === 'like' && ' liked'}
                          {activity.type === 'comment' && ' commented on'}
                          {activity.type === 'follow' && ' started following you'}
                          {activity.post && ` "${activity.post}"`}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 ml-5">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="mb-8">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="feed">Feed</TabsTrigger>
                  <TabsTrigger value="following">Following</TabsTrigger>
                  <TabsTrigger value="trending">Trending</TabsTrigger>
                  <TabsTrigger value="bookmarks">Bookmarks</TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Search and Filters */}
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search posts, people, topics..."
                    className="pl-10 h-12"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                  >
                    <option value="recent">Recent</option>
                    <option value="popular">Popular</option>
                    <option value="most-liked">Most Liked</option>
                  </select>
                  
                  <select
                    value={viewMode}
                    onChange={(e) => setViewMode(e.target.value)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
                  >
                    <option value="cards">Cards</option>
                    <option value="list">List</option>
                    <option value="grid">Grid</option>
                  </select>
                </div>
              </div>

              {/* Selected Tags */}
              {selectedTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Filtered by:</span>
                  {selectedTags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                    >
                      #{tag}
                      <button
                        onClick={() => setSelectedTags(prev => prev.filter(t => t !== tag))}
                        className="hover:text-red-500 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={() => setSelectedTags([])}
                    className="text-sm text-gray-500 hover:text-red-500 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
              )}
            </div>

            {/* New Post Creator */}
            <Card className="mb-8 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 transition-colors">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-12 h-12 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
                  />
                  <div className="flex-1">
                    {/* Post Mode Selector */}
                    <div className="flex gap-2 mb-3">
                      <Button
                        variant={postMode === 'text' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPostMode('text')}
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Text
                      </Button>
                      <Button
                        variant={postMode === 'code' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPostMode('code')}
                      >
                        <Code className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </div>

                    {/* Post Content */}
                    <textarea
                      ref={textareaRef}
                      placeholder="What's on your mind? Share your coding journey, insights, or questions..."
                      className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all duration-200"
                      rows={4}
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                    />

                    {/* Upload Progress */}
                    {isUploading && (
                      <div className="mt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Upload className="w-4 h-4 text-blue-500" />
                          <span className="text-sm text-gray-600">Uploading... {uploadProgress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Media Preview */}
                    {mediaFiles.length > 0 && (
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {mediaFiles.map((file, index) => (
                          <div key={index} className="relative">
                            {file.type === 'image' ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-32 object-cover rounded-lg"
                              />
                            ) : (
                              <video
                                src={file.url}
                                className="w-full h-32 object-cover rounded-lg"
                                muted
                              />
                            )}
                            <button
                              onClick={() => removeMedia(index)}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tags Input */}
                    <div className="mt-3">
                      <Input
                        placeholder="Add tags (comma separated) e.g. React, TypeScript, Frontend"
                        onChange={(e) => {
                          const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
                          setSelectedTags(tags);
                        }}
                        className="w-full"
                      />
                    </div>

                    {/* Action Bar */}
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2">
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={(e) => handleMediaUpload(e.target.files)}
                          accept="image/*,video/*"
                          multiple
                          className="hidden"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => fileInputRef.current?.click()}
                          disabled={isUploading}
                        >
                          <Image className="w-4 h-4 mr-2" />
                          Media
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Smile className="w-4 h-4 mr-2" />
                          Emoji
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MapPin className="w-4 h-4 mr-2" />
                          Location
                        </Button>
                      </div>
                      
                      <div className="flex gap-2">
                        <span className="text-sm text-gray-500 px-3 py-2">
                          {newPost.length}/2000
                        </span>
                        <Button
                          onClick={handleNewPost}
                          disabled={!newPost.trim() && mediaFiles.length === 0}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Post
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {searchQuery || selectedTags.length > 0 
                    ? 'Try adjusting your search or filters to find what you\'re looking for.'
                    : 'Be the first to share something amazing with the community!'}
                </p>
                <Button onClick={() => {
                  setSearchQuery('');
                  setSelectedTags([]);
                  setActiveTab('feed');
                }}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset Filters
                </Button>
              </div>
            )}

            {/* Load More */}
            {filteredPosts.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" className="px-8">
                  Load More Posts
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
