
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Cell, PieChart, Pie, Legend
} from 'recharts';
import { ChartContainer } from '@/components/ui/chart';
import { Calendar, Download, FileText, FilePlus, PieChart as PieChartIcon, Search, Settings, Users } from 'lucide-react';
import { Participant, Quiz } from '@/types/quiz';

// Sample data for reports 
const sampleQuizzes: Quiz[] = [
  {
    id: "quiz1",
    title: "JavaScript Fundamentals",
    topic: "Programming",
    startTime: new Date(2025, 3, 10, 9, 0),
    endTime: new Date(2025, 3, 10, 10, 30),
    duration: 90,
    questions: [],
    createdBy: "user1",
    createdAt: new Date(2025, 3, 5),
    isActive: false,
    invitedParticipants: []
  },
  {
    id: "quiz2",
    title: "React Best Practices",
    topic: "Web Development",
    startTime: new Date(2025, 3, 15, 14, 0),
    endTime: new Date(2025, 3, 15, 15, 0),
    duration: 60,
    questions: [],
    createdBy: "user1",
    createdAt: new Date(2025, 3, 8),
    isActive: false,
    invitedParticipants: []
  },
  {
    id: "quiz3",
    title: "Project Management Essentials",
    topic: "Management",
    startTime: new Date(2025, 3, 20, 10, 0),
    endTime: new Date(2025, 3, 20, 11, 30),
    duration: 90,
    questions: [],
    createdBy: "user1",
    createdAt: new Date(2025, 3, 12),
    isActive: true,
    invitedParticipants: []
  }
];

const sampleParticipants: Participant[] = [
  {
    id: "p1",
    name: "Alice Johnson",
    email: "alice@example.com",
    quizId: "quiz1",
    uniqueLink: "https://example.com/quiz/attempt/quiz1/p1",
    status: "completed",
    startedAt: new Date(2025, 3, 10, 9, 5),
    completedAt: new Date(2025, 3, 10, 9, 45),
    score: 85,
    tabSwitches: 1,
    warnings: [
      {
        timestamp: new Date(2025, 3, 10, 9, 15),
        type: "tab_switch",
        details: "Switched to another browser tab"
      }
    ]
  },
  {
    id: "p2",
    name: "Bob Smith",
    email: "bob@example.com",
    quizId: "quiz1",
    uniqueLink: "https://example.com/quiz/attempt/quiz1/p2",
    status: "completed",
    startedAt: new Date(2025, 3, 10, 9, 3),
    completedAt: new Date(2025, 3, 10, 9, 50),
    score: 92,
    tabSwitches: 0,
    warnings: []
  },
  {
    id: "p3",
    name: "Charlie Brown",
    email: "charlie@example.com",
    quizId: "quiz1",
    uniqueLink: "https://example.com/quiz/attempt/quiz1/p3",
    status: "completed",
    startedAt: new Date(2025, 3, 10, 9, 10),
    completedAt: new Date(2025, 3, 10, 10, 5),
    score: 78,
    tabSwitches: 2,
    warnings: [
      {
        timestamp: new Date(2025, 3, 10, 9, 25),
        type: "fullscreen_exit",
        details: "Exited fullscreen mode"
      },
      {
        timestamp: new Date(2025, 3, 10, 9, 40),
        type: "suspicious_motion",
        details: "Unusual activity detected"
      }
    ]
  },
  {
    id: "p4",
    name: "Diana Evans",
    email: "diana@example.com",
    quizId: "quiz1",
    uniqueLink: "https://example.com/quiz/attempt/quiz1/p4",
    status: "expired",
    uniqueLink: "https://example.com/quiz/attempt/quiz1/p4",
    status: "pending"
  },
  {
    id: "p5",
    name: "Edward Morris",
    email: "edward@example.com",
    quizId: "quiz2",
    uniqueLink: "https://example.com/quiz/attempt/quiz2/p5",
    status: "completed",
    startedAt: new Date(2025, 3, 15, 14, 5),
    completedAt: new Date(2025, 3, 15, 14, 45),
    score: 88,
    tabSwitches: 0,
    warnings: []
  }
];

// Prepare chart data
const scoreDistribution = [
  { range: '0-50%', count: 0 },
  { range: '51-70%', count: 1 },
  { range: '71-85%', count: 2 },
  { range: '86-100%', count: 2 },
];

const completionStatus = [
  { name: 'Completed', value: 4 },
  { name: 'Pending', value: 1 },
  { name: 'Expired', value: 0 },
];

const warningTypes = [
  { name: 'Tab Switching', count: 3 },
  { name: 'Fullscreen Exit', count: 1 },
  { name: 'Suspicious Motion', count: 1 },
  { name: 'Face Not Visible', count: 0 },
];

const COLORS = ['#0EA5E9', '#10B981', '#F59E0B', '#EF4444'];

const Reports = () => {
  const [selectedQuiz, setSelectedQuiz] = useState<string>("quiz1");
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Filter participants based on selected quiz and search term
  const filteredParticipants = sampleParticipants.filter(
    participant => 
      participant.quizId === selectedQuiz && 
      (participant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       participant.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Same as in other pages */}
      <aside className="bg-franchise-blue text-white w-64 min-h-screen flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Quiz Platform</h1>
          <p className="text-gray-300 text-sm mt-1">Manager Dashboard</p>
        </div>
        
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-1">
            <Link to="/quiz/dashboard" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <PieChartIcon className="mr-3 h-5 w-5" />
              Dashboard
            </Link>
            <Link to="/quiz/create" 
              className="flex items-center px-4 py-3 text-gray-300 hover:text-white hover:bg-franchise-blue/30 rounded-md">
              <FilePlus className="mr-3 h-5 w-5" />
              Create Quiz
            </Link>
            <Link to="/quiz/reports" 
              className="flex items-center px-4 py-3 text-white bg-franchise-blue/30 rounded-md">
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
          <h1 className="text-3xl font-bold text-gray-800">Reports & Analytics</h1>
          <p className="text-gray-600">View detailed reports and insights from all your quizzes</p>
        </header>

        {/* Quiz selector */}
        <div className="mb-8">
          <label htmlFor="quizSelect" className="block text-sm font-medium text-gray-700 mb-2">
            Select Quiz
          </label>
          <select 
            id="quizSelect"
            value={selectedQuiz}
            onChange={(e) => setSelectedQuiz(e.target.value)}
            className="w-full md:w-80 h-10 px-3 py-2 text-base border border-input bg-background rounded-md"
          >
            {sampleQuizzes.map(quiz => (
              <option key={quiz.id} value={quiz.id}>
                {quiz.title} ({new Date(quiz.startTime).toLocaleDateString()})
              </option>
            ))}
          </select>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Score Distribution */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Score Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    score: { color: "#10B981" }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={scoreDistribution}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#10B981" name="Participants" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Completion Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Completion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    status: { color: "#0EA5E9" }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {completionStatus.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Warning Types */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Proctoring Warnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ChartContainer
                  config={{
                    warnings: { color: "#F59E0B" }
                  }}
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={warningTypes} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="count" fill="#F59E0B" name="Occurrences" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Quiz Performance Summary */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Average Score</div>
                    <div className="text-2xl font-bold text-franchise-blue">85.8%</div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Completion Rate</div>
                    <div className="text-2xl font-bold text-green-600">80%</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Avg. Time Spent</div>
                    <div className="text-2xl font-bold text-yellow-600">48m</div>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-500">Passing Rate</div>
                    <div className="text-2xl font-bold text-purple-600">90%</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Participants Table */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
            <h2 className="text-xl font-bold text-gray-800">Participants</h2>
            
            <div className="flex space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search participants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-full md:w-64"
                />
              </div>
              
              <Button variant="outline" className="flex items-center gap-1">
                <Download className="h-4 w-4" /> Export
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warnings</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredParticipants.length > 0 ? (
                    filteredParticipants.map((participant) => (
                      <tr key={participant.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {participant.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            participant.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : participant.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {participant.status.charAt(0).toUpperCase() + participant.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.score !== undefined ? `${participant.score}%` : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {participant.warnings?.length || 0}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link to={`/quiz/participant/${participant.id}`} className="text-franchise-teal hover:text-franchise-teal/80 mr-4">
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                        No participants found for this quiz or search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
