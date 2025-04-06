
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FilePlus, FileText, PieChart, Settings, Users } from "lucide-react";
import { DashboardStats, Quiz } from '@/types/quiz';

const ManagerDashboard = () => {
  // In a real app, this would come from an API
  const [stats] = useState<DashboardStats>({
    totalQuizzes: 12,
    totalParticipants: 187,
    attemptRate: 78,
    activeQuizzes: 3,
    completedQuizzes: 8,
    upcomingQuizzes: 1
  });

  const [recentQuizzes] = useState<Quiz[]>([
    {
      id: "1",
      title: "JavaScript Fundamentals",
      topic: "Programming",
      startTime: new Date(2025, 3, 10, 9, 0),
      endTime: new Date(2025, 3, 10, 10, 30),
      duration: 90,
      questions: [],
      createdBy: "user1",
      createdAt: new Date(2025, 3, 5),
      isActive: true,
      invitedParticipants: []
    },
    {
      id: "2",
      title: "React Best Practices",
      topic: "Web Development",
      startTime: new Date(2025, 3, 15, 14, 0),
      endTime: new Date(2025, 3, 15, 15, 0),
      duration: 60,
      questions: [],
      createdBy: "user1",
      createdAt: new Date(2025, 3, 8),
      isActive: true,
      invitedParticipants: []
    },
    {
      id: "3",
      title: "Project Management Essentials",
      topic: "Management",
      startTime: new Date(2025, 3, 20, 10, 0),
      endTime: new Date(2025, 3, 20, 11, 30),
      duration: 90,
      questions: [],
      createdBy: "user1",
      createdAt: new Date(2025, 3, 12),
      isActive: false,
      invitedParticipants: []
    }
  ]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="bg-franchise-blue text-white w-64 min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Quiz Platform</h1>
          <p className="text-gray-300 text-sm mt-1">Manager Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <Link to="/quiz/dashboard" 
              className="flex items-center px-4 py-3 text-white bg-franchise-blue/30 rounded-md">
              <PieChart className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/quiz/create" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <FilePlus className="mr-3 h-5 w-5" />
              Create Quiz
            </Link>
            <Link to="/quiz/reports" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <FileText className="mr-3 h-5 w-5" />
              Reports
            </Link>
            <Link to="/quiz/settings" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </Link>
          </div>
        </nav>
        
        <div className="p-4 border-t border-franchise-blue/30">
          <Link to="/quiz/login" className="flex items-center px-4 py-2 text-gray-300 hover:text-white rounded-md">
            <img 
              src="https://randomuser.me/api/portraits/men/32.jpg" 
              alt="User" 
              className="w-8 h-8 rounded-full mr-3"
            />
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <p className="text-xs text-gray-400">john@example.com</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's an overview of your quizzes.</p>
        </header>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Quizzes</CardTitle>
              <FileText className="h-5 w-5 text-franchise-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalQuizzes}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.activeQuizzes} active, {stats.upcomingQuizzes} upcoming
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Participants</CardTitle>
              <Users className="h-5 w-5 text-franchise-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.totalParticipants}</div>
              <p className="text-xs text-muted-foreground mt-1">Across all quizzes</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Attempt Rate</CardTitle>
              <PieChart className="h-5 w-5 text-franchise-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.attemptRate}%</div>
              <p className="text-xs text-muted-foreground mt-1">Of invited participants</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Completed Quizzes</CardTitle>
              <Clock className="h-5 w-5 text-franchise-teal" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.completedQuizzes}</div>
              <p className="text-xs text-muted-foreground mt-1">Quiz sessions ended</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent quizzes */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Recent Quizzes</h2>
            <Link to="/quiz/create">
              <Button className="bg-franchise-teal hover:bg-franchise-teal/90 text-white">
                <FilePlus className="mr-2 h-4 w-4" /> Create New Quiz
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentQuizzes.map((quiz) => (
                  <tr key={quiz.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {quiz.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.topic}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {quiz.startTime.toLocaleDateString()} at {quiz.startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        quiz.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {quiz.isActive ? 'Active' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Link to={`/quiz/edit/${quiz.id}`} className="text-franchise-teal hover:text-franchise-teal/80 mr-4">
                        Edit
                      </Link>
                      <Link to={`/quiz/results/${quiz.id}`} className="text-franchise-blue hover:text-franchise-blue/80">
                        Results
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Calendar section - simplified placeholder */}
        <div>
          <div className="flex items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">Upcoming Schedule</h2>
            <Calendar className="ml-2 h-5 w-5 text-franchise-teal" />
          </div>
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-gray-500 py-6">
                Calendar view will be displayed here with scheduled quizzes
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ManagerDashboard;
