'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { BookOpen, GraduationCap, PenTool, Ambulance as Vocabulary, TrendingUp, Users } from 'lucide-react';
import toast from 'react-hot-toast';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useSelector } from 'react-redux';

interface DashboardStats {
  totalUnits: number;
  totalLessons: number;
  totalExercises: number;
  totalVocabulary: number;
  activeUsers: number;
  completionRate: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalUnits: 0,
    totalLessons: 0,
    totalExercises: 0,
    totalVocabulary: 0,
    activeUsers: 0,
    completionRate: 0
  });
  const token = useSelector((state: any) => state.auth?.token);

  // For demo, example data for chart could represent monthly user activity or progress:
  const [chartData, setChartData] = useState([
    { name: 'Jan', activeUsers: 40, completionRate: 60 },
    { name: 'Feb', activeUsers: 30, completionRate: 50 },
    { name: 'Mar', activeUsers: 20, completionRate: 70 },
    { name: 'Apr', activeUsers: 27, completionRate: 65 },
    { name: 'May', activeUsers: 18, completionRate: 75 },
    { name: 'Jun', activeUsers: 23, completionRate: 80 },
  ]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [unitsRes, lessonsRes, exercisesRes, vocabularyRes] = await Promise.allSettled([
        axios.get('/api/units'),
        axios.get('/api/lessons', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('/api/exercise', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }),
        axios.get('/api/vocabulary', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      ]);

      setStats({
        totalUnits: unitsRes.status === "fulfilled" ? unitsRes.value.data.units?.length || 0 : 0,
        totalLessons: lessonsRes.status === "fulfilled" ? lessonsRes.value.data.lessons?.length || 0 : 0,
        totalExercises: exercisesRes.status === "fulfilled" ? exercisesRes.value.data.exercises?.length || 0 : 0,
        totalVocabulary: vocabularyRes.status === "fulfilled" ? vocabularyRes.value.data.vocabularies?.length || 0 : 0,
        activeUsers: 0, // Replace with real analytics data when available
        completionRate: 0
      });

      // Optionally, show error toast only for failed requests
      if (unitsRes.status === "rejected") toast.error("Failed to load units");
      if (lessonsRes.status === "rejected") toast.error("Failed to load lessons");
      if (exercisesRes.status === "rejected") toast.error("Failed to load exercises");
      if (vocabularyRes.status === "rejected") toast.error("Failed to load vocabulary");

    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong while loading stats");
    }
  };


  const statCards = [
    { name: 'Total Units', value: stats.totalUnits, icon: BookOpen, color: 'bg-blue-500' },
    { name: 'Total Lessons', value: stats.totalLessons, icon: GraduationCap, color: 'bg-green-500' },
    { name: 'Total Exercises', value: stats.totalExercises, icon: PenTool, color: 'bg-yellow-500' },
    { name: 'Vocabulary Words', value: stats.totalVocabulary, icon: Vocabulary, color: 'bg-purple-500' },
    { name: 'Active Users', value: stats.activeUsers, icon: Users, color: 'bg-indigo-500' },
    { name: 'Completion Rate', value: `${stats.completionRate}%`, icon: TrendingUp, color: 'bg-pink-500' }
  ];

  return (
    <div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="mt-2 text-sm text-gray-700">
            Overview of your German learning app content and user engagement.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-white overflow-hidden shadow-2xl rounded-lg p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className={`inline-flex items-center justify-center p-3 rounded-md ${stat.color}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                    <dd className="text-lg font-medium text-gray-900">{stat.value}</dd>
                  </dl>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Chart Section replacing Recent Activity */}
      <div className="mt-8 bg-white overflow-hidden shadow-2xl rounded-lg px-4 py-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">User Activity & Completion Rate</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#6ed5b7" />
            <YAxis yAxisId="right" orientation="right" stroke="#f7ab61" />
            <Tooltip />
            <Legend verticalAlign="top" height={58} />
            <Bar yAxisId="left" dataKey="activeUsers" fill="#256c47" name="Active Users" />
            <Bar yAxisId="right" dataKey="completionRate" fill="#fc8817" name="Completion Rate (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
