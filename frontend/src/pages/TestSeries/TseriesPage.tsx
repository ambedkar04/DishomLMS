import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, Trophy, Play } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Menubar from '@/components/Menubar';

const TseriesPage: React.FC = () => {
  // Dummy test series data
  const testSeries = [
    {
      id: 1,
      title: "NEET 2025 Full Mock Test Series",
      description: "Complete mock test series with 50 full-length tests",
      duration: "3 hours",
      questions: 180,
      attempts: 1250,
      difficulty: "High",
      price: "₹1,999",
      status: "Active"
    },
    {
      id: 2,
      title: "JEE Main Chapter-wise Tests",
      description: "Subject-wise practice tests for thorough preparation",
      duration: "1.5 hours",
      questions: 75,
      attempts: 890,
      difficulty: "Medium",
      price: "₹1,499",
      status: "Active"
    },
    {
      id: 3,
      title: "Board Exam Practice Series",
      description: "Practice tests based on latest board exam pattern",
      duration: "3 hours",
      questions: 100,
      attempts: 2100,
      difficulty: "Easy",
      price: "₹999",
      status: "Coming Soon"
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy':
        return 'default';
      case 'Medium':
        return 'secondary';
      case 'High':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Menubar />
        <div className="flex-1 overflow-y-auto py-8 px-16">
          <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Series</h1>
          <p className="text-gray-600">Practice with our comprehensive test series</p>
        </div>

        {/* Test Series Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testSeries.map((test) => (
            <Card key={test.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    {test.title}
                  </CardTitle>
                  <Badge variant={getDifficultyColor(test.difficulty)}>
                    {test.difficulty}
                  </Badge>
                </div>
                <CardDescription className="text-sm text-gray-600">
                  {test.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Duration */}
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Duration: {test.duration}</span>
                </div>

                {/* Questions */}
                <div className="flex items-center space-x-2">
                  <Trophy className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{test.questions} Questions</span>
                </div>

                {/* Attempts */}
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{test.attempts} students attempted</span>
                </div>

                {/* Price */}
                <div className="pt-2 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-600">{test.price}</span>
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      disabled={test.status === 'Coming Soon'}
                    >
                      <Play className="h-4 w-4 mr-1" />
                      {test.status === 'Coming Soon' ? 'Coming Soon' : 'Start Test'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Series Stats */}
        <div className="mt-12">
          <Card className="bg-purple-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-xl font-bold text-purple-900">
                📊 Test Series Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Tests</h4>
                  <p className="text-2xl font-bold text-blue-600">{testSeries.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Total Attempts</h4>
                  <p className="text-2xl font-bold text-green-600">
                    {testSeries.reduce((sum, test) => sum + test.attempts, 0)}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-2">Active Tests</h4>
                  <p className="text-2xl font-bold text-orange-600">
                    {testSeries.filter(test => test.status === 'Active').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TseriesPage;