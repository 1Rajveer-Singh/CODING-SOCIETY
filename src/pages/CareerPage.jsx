import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  MapPin, 
  ExternalLink, 
  Award, 
  Briefcase,
  GraduationCap,
  Code,
  Rocket,
  Target,
  Clock,
  DollarSign,
  Building
} from 'lucide-react';

const CareerPage = () => {
  const [selectedTab, setSelectedTab] = useState('dashboard');

  const studentProgress = {
    overallProgress: 68,
    skills: [
      { name: 'JavaScript', level: 85, color: 'bg-yellow-500' },
      { name: 'React', level: 75, color: 'bg-blue-500' },
      { name: 'Node.js', level: 65, color: 'bg-green-500' },
      { name: 'Python', level: 45, color: 'bg-purple-500' },
      { name: 'TypeScript', level: 55, color: 'bg-blue-600' },
      { name: 'Database Design', level: 60, color: 'bg-orange-500' }
    ],
    achievements: [
      { name: 'First Project', description: 'Completed your first coding project', date: '2024-01-15', earned: true },
      { name: 'Code Master', description: 'Wrote 1000+ lines of code', date: '2024-01-20', earned: true },
      { name: 'Team Player', description: 'Collaborated on 5 projects', date: '2024-01-25', earned: false },
      { name: 'Problem Solver', description: 'Solved 50 coding challenges', date: null, earned: false }
    ]
  };

  const internships = [
    {
      id: 1,
      title: 'Frontend Developer Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '3 months',
      stipend: '$2000/month',
      description: 'Join our frontend team to build responsive web applications using React and TypeScript.',
      requirements: ['React', 'JavaScript', 'CSS', 'Git'],
      posted: '2 days ago',
      deadline: '2024-02-15',
      applicants: 45,
      featured: true
    },
    {
      id: 2,
      title: 'Backend Developer Intern',
      company: 'DataFlow Inc',
      location: 'Austin, TX',
      type: 'Hybrid',
      duration: '4 months',
      stipend: '$2500/month',
      description: 'Work with our backend team to develop scalable APIs and microservices.',
      requirements: ['Node.js', 'Python', 'PostgreSQL', 'AWS'],
      posted: '1 week ago',
      deadline: '2024-02-20',
      applicants: 32
    },
    {
      id: 3,
      title: 'Machine Learning Intern',
      company: 'AI Solutions',
      location: 'Seattle, WA',
      type: 'On-site',
      duration: '6 months',
      stipend: '$3000/month',
      description: 'Research and develop machine learning models for computer vision applications.',
      requirements: ['Python', 'TensorFlow', 'PyTorch', 'Statistics'],
      posted: '3 days ago',
      deadline: '2024-02-10',
      applicants: 67
    }
  ];

  const hackathons = [
    {
      id: 1,
      name: 'Global Innovation Hackathon 2024',
      organizer: 'TechWorld',
      date: '2024-03-15',
      duration: '48 hours',
      prize: '$50,000',
      participants: 2500,
      theme: 'Sustainable Technology',
      mode: 'Virtual',
      status: 'Registration Open'
    },
    {
      id: 2,
      name: 'AI for Good Challenge',
      organizer: 'AI Foundation',
      date: '2024-04-20',
      duration: '72 hours',
      prize: '$25,000',
      participants: 1200,
      theme: 'AI for Social Impact',
      mode: 'Hybrid',
      status: 'Coming Soon'
    },
    {
      id: 3,
      name: 'FinTech Innovation Sprint',
      organizer: 'FinanceHub',
      date: '2024-05-10',
      duration: '36 hours',
      prize: '$30,000',
      participants: 800,
      theme: 'Financial Technology',
      mode: 'On-site',
      status: 'Registration Open'
    }
  ];

  const portfolioSections = [
    {
      title: 'Personal Information',
      status: 'Complete',
      items: ['Profile Photo', 'Contact Details', 'Bio', 'Location']
    },
    {
      title: 'Skills & Technologies',
      status: 'In Progress',
      items: ['Programming Languages', 'Frameworks', 'Tools', 'Certifications']
    },
    {
      title: 'Projects',
      status: 'Needs Work',
      items: ['Project Descriptions', 'Screenshots', 'Live Demos', 'Source Code']
    },
    {
      title: 'Experience',
      status: 'Empty',
      items: ['Work Experience', 'Internships', 'Volunteer Work', 'Leadership']
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Complete': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'In Progress': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Needs Work': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'Empty': return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Career & Growth Hub
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Track your progress, find internships, participate in hackathons, 
            and build a professional portfolio to accelerate your career.
          </p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="hackathons">Hackathons</TabsTrigger>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-blue-500" />
                      Learning Progress
                    </CardTitle>
                    <CardDescription>
                      Your overall development progress across different technologies
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>Overall Progress</span>
                        <span>{studentProgress.overallProgress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div
                          className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${studentProgress.overallProgress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {studentProgress.skills.map((skill) => (
                        <div key={skill.name}>
                          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                            <span>{skill.name}</span>
                            <span>{skill.level}%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className={`${skill.color} h-2 rounded-full transition-all duration-300`}
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Achievements */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-500" />
                      Recent Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {studentProgress.achievements.map((achievement, index) => (
                        <div key={index} className={`flex items-center gap-4 p-3 rounded-lg ${achievement.earned ? 'bg-green-50 dark:bg-green-900/20' : 'bg-gray-50 dark:bg-gray-800'}`}>
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${achievement.earned ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'}`}>
                            <Award className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${achievement.earned ? 'text-green-800 dark:text-green-200' : 'text-gray-600 dark:text-gray-400'}`}>
                              {achievement.name}
                            </h4>
                            <p className={`text-sm ${achievement.earned ? 'text-green-600 dark:text-green-300' : 'text-gray-500 dark:text-gray-500'}`}>
                              {achievement.description}
                            </p>
                            {achievement.earned && achievement.date && (
                              <p className="text-xs text-green-500 dark:text-green-400 mt-1">
                                Earned on {new Date(achievement.date).toLocaleDateString()}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Projects Completed</span>
                        <span className="font-medium">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Code Commits</span>
                        <span className="font-medium">345</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Learning Streak</span>
                        <span className="font-medium text-orange-600">15 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Certificates</span>
                        <span className="font-medium">3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Community Rank</span>
                        <span className="font-medium text-blue-600">#247</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Goals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Complete React course</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Build portfolio project</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span className="text-sm">Join hackathon team</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-4 h-4 text-orange-500" />
                        <span className="text-sm">Apply for internships</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Opportunities Tab */}
          <TabsContent value="opportunities" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Internship Opportunities
              </h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">All</Button>
                <Button variant="outline" size="sm">Remote</Button>
                <Button variant="outline" size="sm">On-site</Button>
                <Button variant="outline" size="sm">Hybrid</Button>
              </div>
            </div>

            <div className="grid gap-6">
              {internships.map((internship) => (
                <Card key={internship.id} className={`hover:shadow-lg transition-shadow duration-300 ${internship.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          {internship.featured && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium">
                              Featured
                            </span>
                          )}
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                            {internship.type}
                          </span>
                        </div>
                        <CardTitle className="text-xl mb-2">{internship.title}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Building className="w-3 h-3" />
                            {internship.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {internship.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {internship.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {internship.stipend}
                          </div>
                        </div>
                        <CardDescription className="text-base mb-4">
                          {internship.description}
                        </CardDescription>
                        
                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {internship.requirements.map((req) => (
                            <span
                              key={req}
                              className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-full"
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span>Posted {internship.posted}</span>
                          <span>•</span>
                          <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                          <span>•</span>
                          <span>{internship.applicants} applicants</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm">
                          Apply Now
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                        <Button variant="outline" size="sm">
                          Save
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Hackathons Tab */}
          <TabsContent value="hackathons" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Upcoming Hackathons
              </h2>
              <Button>
                <Rocket className="w-4 h-4 mr-2" />
                Submit Your Hackathon
              </Button>
            </div>

            <div className="grid gap-6">
              {hackathons.map((hackathon) => (
                <Card key={hackathon.id} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">{hackathon.name}</CardTitle>
                        <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {hackathon.organizer}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(hackathon.date).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {hackathon.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Award className="w-3 h-3" />
                            {hackathon.prize}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 mb-4">
                          <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 text-sm rounded-full">
                            {hackathon.theme}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            hackathon.status === 'Registration Open' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                              : 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
                          }`}>
                            {hackathon.status}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                            {hackathon.mode}
                          </span>
                        </div>
                        
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {hackathon.participants.toLocaleString()} participants expected
                        </p>
                      </div>
                      <div className="flex flex-col gap-2 ml-4">
                        <Button size="sm" disabled={hackathon.status === 'Coming Soon'}>
                          {hackathon.status === 'Registration Open' ? 'Register' : 'Coming Soon'}
                        </Button>
                        <Button variant="outline" size="sm">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Portfolio Builder
              </h2>
              <Button>
                <ExternalLink className="w-4 h-4 mr-2" />
                Preview Portfolio
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioSections.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(section.status)}`}>
                        {section.status}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-4">
                      {section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <div className={`w-2 h-2 rounded-full ${
                            section.status === 'Complete' ? 'bg-green-500' :
                            section.status === 'In Progress' ? 'bg-yellow-500' :
                            'bg-gray-300'
                          }`}></div>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button variant="outline" size="sm" className="w-full">
                      {section.status === 'Empty' ? 'Get Started' : 'Edit Section'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Portfolio Completion</CardTitle>
                <CardDescription>
                  Complete all sections to create a professional portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Overall Completion</span>
                    <span>25%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full transition-all duration-300" style={{ width: '25%' }}></div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  A complete portfolio increases your chances of getting hired by 75%. 
                  Focus on adding projects and work experience next.
                </p>
                <Button>
                  <GraduationCap className="w-4 h-4 mr-2" />
                  Portfolio Tips & Guide
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CareerPage;
