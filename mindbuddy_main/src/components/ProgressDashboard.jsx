import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calendar, Target, Award, Flame, Heart, Clock, Star } from 'lucide-react';

const achievements = [
  {
    id: 1,
    name: 'First Steps',
    description: 'Complete your first meditation session',
    icon: Star,
    color: 'from-yellow-400 to-orange-500',
    unlocked: true
  },
  {
    id: 2,
    name: 'Week Warrior',
    description: 'Meditate for 7 consecutive days',
    icon: Flame,
    color: 'from-red-400 to-pink-500',
    unlocked: false
  },
  {
    id: 3,
    name: 'Mindful Master',
    description: 'Complete 30 meditation sessions',
    icon: Award,
    color: 'from-purple-400 to-indigo-500',
    unlocked: false
  },
  {
    id: 4,
    name: 'Breathing Pro',
    description: 'Practice breathing exercises for 10 days',
    icon: Heart,
    color: 'from-green-400 to-emerald-500',
    unlocked: true
  }
];

const weeklyData = [
  { day: 'Mon', sessions: 2, mood: 4 },
  { day: 'Tue', sessions: 1, mood: 3 },
  { day: 'Wed', sessions: 3, mood: 5 },
  { day: 'Thu', sessions: 0, mood: 2 },
  { day: 'Fri', sessions: 2, mood: 4 },
  { day: 'Sat', sessions: 1, mood: 3 },
  { day: 'Sun', sessions: 2, mood: 4 }
];

export const ProgressDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    totalSessions: 24,
    currentStreak: 5,
    longestStreak: 12,
    averageMood: 3.8,
    totalMinutes: 180,
    weeklyGoal: 7
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'analytics', label: 'Analytics', icon: Target }
  ];

  const getWeeklyProgress = () => {
    const completed = weeklyData.reduce((sum, day) => sum + day.sessions, 0);
    return (completed / stats.weeklyGoal) * 100;
  };

  const getMoodTrend = () => {
    const recentMoods = weeklyData.slice(-3).map(day => day.mood);
    const avgMood = recentMoods.reduce((sum, mood) => sum + mood, 0) / recentMoods.length;
    return avgMood > stats.averageMood ? 'up' : avgMood < stats.averageMood ? 'down' : 'stable';
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-dark-green mb-2">Your Progress Dashboard</h2>
        <p className="text-dark-green/70">Track your mental wellness journey and celebrate your achievements</p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 flex gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  activeTab === tab.id
                    ? 'bg-dark-green text-light-orange shadow-lg'
                    : 'text-dark-green hover:bg-light-orange/50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Total Sessions',
                  value: stats.totalSessions,
                  icon: Clock,
                  color: 'from-blue-400 to-cyan-500',
                  trend: '+3 this week'
                },
                {
                  title: 'Current Streak',
                  value: stats.currentStreak,
                  icon: Flame,
                  color: 'from-orange-400 to-red-500',
                  trend: 'days'
                },
                {
                  title: 'Average Mood',
                  value: stats.averageMood.toFixed(1),
                  icon: Heart,
                  color: 'from-green-400 to-emerald-500',
                  trend: getMoodTrend() === 'up' ? '↗ Improving' : getMoodTrend() === 'down' ? '↘ Declining' : '→ Stable'
                },
                {
                  title: 'Total Minutes',
                  value: stats.totalMinutes,
                  icon: Target,
                  color: 'from-purple-400 to-pink-500',
                  trend: 'meditated'
                }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-dark-green/60">{stat.trend}</span>
                    </div>
                    <div className="text-3xl font-bold text-dark-green mb-1">{stat.value}</div>
                    <div className="text-dark-green/70">{stat.title}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Weekly Progress */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-4">Weekly Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-dark-green/70">Weekly Goal</span>
                    <span className="font-semibold text-dark-green">{stats.weeklyGoal} sessions</span>
                  </div>
                  <div className="w-full bg-light-orange/30 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getWeeklyProgress()}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="bg-gradient-to-r from-dark-green to-light-green h-3 rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-dark-green/60">
                      {weeklyData.reduce((sum, day) => sum + day.sessions, 0)} of {stats.weeklyGoal} completed
                    </span>
                    <span className="text-dark-green font-semibold">{getWeeklyProgress().toFixed(0)}%</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-4">Mood Trend</h3>
                <div className="flex items-end justify-between h-32">
                  {weeklyData.map((day, index) => (
                    <div key={day.day} className="flex flex-col items-center">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${(day.mood / 5) * 100}%` }}
                        transition={{ delay: index * 0.1 }}
                        className="w-8 bg-gradient-to-t from-dark-green to-light-green rounded-t-lg relative group"
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-green text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                          {day.mood}/5
                        </div>
                      </motion.div>
                      <span className="text-xs text-dark-green/60 mt-2">{day.day}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {activeTab === 'achievements' && (
          <motion.div
            key="achievements"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-6 rounded-2xl transition-all ${
                      achievement.unlocked
                        ? 'bg-gradient-to-r from-light-green to-light-orange shadow-lg'
                        : 'bg-white/50 backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-4 rounded-xl ${
                        achievement.unlocked 
                          ? `bg-gradient-to-r ${achievement.color}` 
                          : 'bg-gray-200'
                      }`}>
                        <Icon className={`w-8 h-8 ${
                          achievement.unlocked ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-lg font-semibold ${
                          achievement.unlocked ? 'text-dark-green' : 'text-gray-500'
                        }`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-sm ${
                          achievement.unlocked ? 'text-dark-green/70' : 'text-gray-400'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.unlocked && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-2xl"
                        >
                          🎉
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-light-green to-light-orange p-6 rounded-2xl text-center"
            >
              <h3 className="text-xl font-semibold text-dark-green mb-2">Keep Going!</h3>
              <p className="text-dark-green/70">
                You've unlocked {achievements.filter(a => a.unlocked).length} of {achievements.length} achievements. 
                Continue your wellness journey to unlock more!
              </p>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-4">Session Distribution</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Morning', value: 40, color: 'from-yellow-400 to-orange-500' },
                    { label: 'Afternoon', value: 25, color: 'from-blue-400 to-cyan-500' },
                    { label: 'Evening', value: 35, color: 'from-purple-400 to-pink-500' }
                  ].map((item, index) => (
                    <div key={item.label} className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-light-green to-light-orange" />
                      <span className="text-dark-green/70 flex-1">{item.label}</span>
                      <span className="font-semibold text-dark-green">{item.value}%</span>
                      <div className="w-20 bg-light-orange/30 rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: index * 0.2 }}
                          className="bg-gradient-to-r from-dark-green to-light-green h-2 rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-4">Streak Analysis</h3>
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-dark-green mb-2">{stats.currentStreak}</div>
                    <div className="text-dark-green/70">Current Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-dark-green mb-2">{stats.longestStreak}</div>
                    <div className="text-dark-green/70">Longest Streak</div>
                  </div>
                  <div className="bg-light-orange/30 rounded-xl p-4">
                    <div className="text-sm text-dark-green/70 mb-2">Streak Goal</div>
                    <div className="text-lg font-semibold text-dark-green">30 days</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}; 