"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Users, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  BookOpen,
  Star,
  DollarSign
} from 'lucide-react';

const stats = [
  {
    title: "Total Students",
    value: "148",
    change: "+12%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50"
  },
  {
    title: "Classes This Week",
    value: "24",
    change: "+3",
    icon: Calendar,
    color: "text-green-600",
    bgColor: "bg-green-50"
  },
  {
    title: "Average Rating",
    value: "4.9",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50"
  },
  {
    title: "Monthly Earnings",
    value: "$4,280",
    change: "+18%",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50"
  }
];

const recentActivities = [
  {
    type: "class",
    title: "Mathematics - Grade 10",
    time: "2 hours ago",
    status: "completed"
  },
  {
    type: "assessment",
    title: "Physics Quiz Graded",
    time: "4 hours ago",
    status: "completed"
  },
  {
    type: "meeting",
    title: "Parent-Teacher Conference",
    time: "Tomorrow 3:00 PM",
    status: "upcoming"
  },
  {
    type: "class",
    title: "Chemistry Lab Session",
    time: "Tomorrow 10:00 AM",
    status: "upcoming"
  }
];

export function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Alyna!</h1>
        <p className="text-gray-600 mt-2">Here's what's happening with your classes today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-green-600 mt-1">{stat.change} from last month</p>
                  </div>
                  <div className={`${stat.bgColor} ${stat.color} p-3 rounded-lg`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-600" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-600">
                <div className="text-center">
                  <p className="text-sm font-semibold text-blue-600">9:00 AM</p>
                  <p className="text-xs text-gray-500">60 min</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Mathematics - Grade 10</p>
                  <p className="text-sm text-gray-600">Room 201 • 25 students</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-green-50 rounded-lg border-l-4 border-green-600">
                <div className="text-center">
                  <p className="text-sm font-semibold text-green-600">11:00 AM</p>
                  <p className="text-xs text-gray-500">90 min</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Physics Lab</p>
                  <p className="text-sm text-gray-600">Lab 3 • 15 students</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-600">
                <div className="text-center">
                  <p className="text-sm font-semibold text-purple-600">2:00 PM</p>
                  <p className="text-xs text-gray-500">45 min</p>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Chemistry - Grade 11</p>
                  <p className="text-sm text-gray-600">Room 305 • 20 students</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'completed' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-500">{activity.time}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activity.status === 'completed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-2 p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <BookOpen className="w-6 h-6 text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Create Lesson</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <Users className="w-6 h-6 text-green-600" />
              <span className="text-sm font-medium text-green-600">Add Student</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <Award className="w-6 h-6 text-purple-600" />
              <span className="text-sm font-medium text-purple-600">Grade Assignments</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-4 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors">
              <Calendar className="w-6 h-6 text-orange-600" />
              <span className="text-sm font-medium text-orange-600">Schedule Meeting</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}