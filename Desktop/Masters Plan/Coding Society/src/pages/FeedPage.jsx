import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
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
  UserPlus
} from 'lucide-react';

const FeedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for posts
  useEffect(() => {
    const mockPosts = [
      {
        id: 1,
        author: {
          name: 'Sarah Chen',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
          role: 'Frontend Developer',
          isFollowing: false
        },
        content: 'Just built my first React app with TypeScript! The type safety is amazing and catches so many errors during development. Here are some tips I learned along the way...',
        type: 'text',
        timestamp: '2 hours ago',
        likes: 234,
        comments: 45,
        shares: 12,
        isLiked: false,
        isBookmarked: false,
        tags: ['React', 'TypeScript', 'Frontend'],
        codeSnippet: `interface User {
  id: number;
  name: string;
  email: string;
}

const UserProfile: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="profile">
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
};`
      },
      {
        id: 2,
        author: {
          name: 'Alex Kumar',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
          role: 'ML Engineer',
          isFollowing: true
        },
        content: 'Machine Learning model deployment best practices. Just deployed my first ML model to production using Docker and FastAPI. Here\'s what I learned about scaling and monitoring...',
        type: 'text',
        timestamp: '5 hours ago',
        likes: 156,
        comments: 23,
        shares: 8,
        isLiked: true,
        isBookmarked: true,
        tags: ['MachineLearning', 'Python', 'Docker', 'FastAPI'],
        image: 'https://via.placeholder.com/600x300/4f46e5/ffffff?text=ML+Model+Architecture'
      },
      {
        id: 3,
        author: {
          name: 'Mike Johnson',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mike',
          role: 'Backend Developer',
          isFollowing: false
        },
        content: 'Node.js performance optimization techniques that improved our API response time by 60%. Thread pools, caching strategies, and database query optimization tips...',
        type: 'text',
        timestamp: '1 day ago',
        likes: 189,
        comments: 34,
        shares: 15,
        isLiked: false,
        isBookmarked: false,
        tags: ['Node.js', 'Performance', 'Backend'],
        codeSnippet: `// Redis caching middleware
const cache = require('redis').createClient();

const cacheMiddleware = (duration) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await cache.get(key);
    
    if (cached) {
      return res.json(JSON.parse(cached));
    }
    
    res.sendResponse = res.json;
    res.json = (body) => {
      cache.setex(key, duration, JSON.stringify(body));
      res.sendResponse(body);
    };
    
    next();
  };
};`
      }
    ];
    
    setTimeout(() => {
      setPosts(mockPosts);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleBookmark = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleFollow = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            author: { 
              ...post.author, 
              isFollowing: !post.author.isFollowing 
            }
          }
        : post
    ));
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      author: {
        name: user.name,
        avatar: user.avatar,
        role: user.role,
        isFollowing: false
      },
      content: newPost,
      type: 'text',
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      tags: []
    };
    
    setPosts([post, ...posts]);
    setNewPost('');
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (filter === 'following') {
      return matchesSearch && post.author.isFollowing;
    }
    
    return matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Feed
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Stay updated with the latest from your coding community
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search posts, people, or topics..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              All
            </Button>
            <Button
              variant={filter === 'following' ? 'default' : 'outline'}
              onClick={() => setFilter('following')}
              size="sm"
            >
              Following
            </Button>
          </div>
        </div>

        {/* New Post */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <textarea
                  placeholder="What's on your mind? Share your coding journey..."
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                  rows={3}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                />
                <div className="flex justify-between items-center mt-3">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Code className="w-4 h-4 mr-2" />
                      Code
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Image className="w-4 h-4 mr-2" />
                      Image
                    </Button>
                    <Button variant="ghost" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Article
                    </Button>
                  </div>
                  <Button onClick={handleNewPost} disabled={!newPost.trim()}>
                    <Plus className="w-4 h-4 mr-2" />
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <CardTitle className="text-lg">{post.author.name}</CardTitle>
                      <CardDescription>
                        {post.author.role} • {post.timestamp}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {!post.author.isFollowing && post.author.name !== user.name && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleFollow(post.id)}
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
                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                  {post.content}
                </p>
                
                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Image */}
                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full rounded-lg mb-4"
                  />
                )}
                
                {/* Code Snippet */}
                {post.codeSnippet && (
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{post.codeSnippet}</code>
                    </pre>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-2 text-sm transition-colors ${
                        post.isLiked
                          ? 'text-red-500 hover:text-red-600'
                          : 'text-gray-500 hover:text-red-500'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
                      {post.likes}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-green-500 transition-colors">
                      <Share2 className="w-4 h-4" />
                      {post.shares}
                    </button>
                  </div>
                  <button
                    onClick={() => handleBookmark(post.id)}
                    className={`text-sm transition-colors ${
                      post.isBookmarked
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-500 hover:text-yellow-500'
                    }`}
                  >
                    <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              {searchQuery || filter === 'following' 
                ? 'No posts found matching your criteria.'
                : 'No posts yet. Be the first to share something!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
