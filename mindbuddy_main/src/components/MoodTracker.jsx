import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Calendar, Smile, Frown, Meh, Heart, Activity } from 'lucide-react';

const moodEmojis = [
  { id: 1, emoji: '😊', label: 'Happy', color: 'from-green-400 to-emerald-500', value: 5 },
  { id: 2, emoji: '😌', label: 'Calm', color: 'from-blue-400 to-cyan-500', value: 4 },
  { id: 3, emoji: '😐', label: 'Neutral', color: 'from-gray-400 to-slate-500', value: 3 },
  { id: 4, emoji: '😔', label: 'Sad', color: 'from-yellow-400 to-orange-500', value: 2 },
  { id: 5, emoji: '😢', label: 'Very Sad', color: 'from-red-400 to-pink-500', value: 1 }
];

const activities = [
  { id: 1, name: 'Exercise', icon: Activity, color: 'from-purple-400 to-pink-500' },
  { id: 2, name: 'Meditation', icon: Heart, color: 'from-blue-400 to-indigo-500' },
  { id: 3, name: 'Social', icon: Smile, color: 'from-green-400 to-teal-500' },
  { id: 4, name: 'Work', icon: TrendingUp, color: 'from-orange-400 to-red-500' },
  { id: 5, name: 'Sleep', icon: Calendar, color: 'from-indigo-400 to-purple-500' }
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [moodHistory, setMoodHistory] = useState([]);
  const [showInsights, setShowInsights] = useState(false);

  useEffect(() => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      setMoodHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };

  const handleActivityToggle = (activity) => {
    setSelectedActivities(prev => 
      prev.includes(activity.id) 
        ? prev.filter(id => id !== activity.id)
        : [...prev, activity.id]
    );
  };

  const saveMoodEntry = () => {
    if (!selectedMood) return;

    const entry = {
      id: Date.now(),
      mood: selectedMood,
      activities: selectedActivities,
      timestamp: new Date(),
      date: new Date().toLocaleDateString()
    };

    const newHistory = [...moodHistory, entry];
    setMoodHistory(newHistory);
    localStorage.setItem('moodHistory', JSON.stringify(newHistory));
    
    // Reset selections
    setSelectedMood(null);
    setSelectedActivities([]);
    
    // Show success animation
    setTimeout(() => setShowInsights(true), 500);
  };

  const getWeeklyAverage = () => {
    const lastWeek = moodHistory.filter(entry => {
      const entryDate = new Date(entry.timestamp);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return entryDate >= weekAgo;
    });
    
    if (lastWeek.length === 0) return 0;
    return lastWeek.reduce((sum, entry) => sum + entry.mood.value, 0) / lastWeek.length;
  };

  const averageMood = getWeeklyAverage();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-dark-green mb-2">How are you feeling today?</h2>
        <p className="text-dark-green/70">Track your mood and activities to understand your patterns</p>
      </motion.div>

      {/* Mood Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">Select your mood:</h3>
        <div className="grid grid-cols-5 gap-4">
          {moodEmojis.map((mood, index) => (
            <motion.button
              key={mood.id}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMoodSelect(mood)}
              className={`relative p-4 rounded-2xl transition-all duration-300 ${
                selectedMood?.id === mood.id
                  ? 'ring-4 ring-dark-green/30 shadow-lg'
                  : 'hover:shadow-md'
              }`}
              style={{
                background: selectedMood?.id === mood.id 
                  ? `linear-gradient(135deg, ${mood.color.split(' ')[0].replace('from-', '')}, ${mood.color.split(' ')[1].replace('to-', '')})`
                  : 'white'
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="text-4xl mb-2"
              >
                {mood.emoji}
              </motion.div>
              <p className={`text-sm font-medium ${
                selectedMood?.id === mood.id ? 'text-white' : 'text-dark-green'
              }`}>
                {mood.label}
              </p>
              {selectedMood?.id === mood.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-dark-green rounded-full flex items-center justify-center"
                >
                  <span className="text-white text-xs">✓</span>
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Activities Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">What did you do today?</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            const isSelected = selectedActivities.includes(activity.id);
            
            return (
              <motion.button
                key={activity.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleActivityToggle(activity)}
                className={`p-3 rounded-xl transition-all duration-300 flex flex-col items-center gap-2 ${
                  isSelected 
                    ? 'ring-2 ring-dark-green shadow-lg' 
                    : 'hover:shadow-md'
                }`}
                style={{
                  background: isSelected 
                    ? `linear-gradient(135deg, ${activity.color.split(' ')[0].replace('from-', '')}, ${activity.color.split(' ')[1].replace('to-', '')})`
                    : 'white'
                }}
              >
                <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-dark-green'}`} />
                <span className={`text-xs font-medium ${isSelected ? 'text-white' : 'text-dark-green'}`}>
                  {activity.name}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-8"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={saveMoodEntry}
          disabled={!selectedMood}
          className={`px-8 py-4 rounded-2xl font-semibold transition-all ${
            selectedMood
              ? 'bg-dark-green text-light-orange hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Save Today's Entry
        </motion.button>
      </motion.div>

      {/* Mood Insights */}
      <AnimatePresence>
        {showInsights && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gradient-to-r from-light-green to-light-orange p-6 rounded-2xl mb-8"
          >
            <h3 className="text-xl font-semibold text-dark-green mb-4">Weekly Mood Insights</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-dark-green">{averageMood.toFixed(1)}</div>
                <div className="text-dark-green/70">Average Mood</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-dark-green">{moodHistory.length}</div>
                <div className="text-dark-green/70">Days Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-dark-green">
                  {averageMood >= 4 ? '😊' : averageMood >= 3 ? '😐' : '😔'}
                </div>
                <div className="text-dark-green/70">Overall Trend</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood History Chart */}
      {moodHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl"
        >
          <h3 className="text-xl font-semibold text-dark-green mb-4">Your Mood Journey</h3>
          <div className="flex items-end gap-2 h-32">
            {moodHistory.slice(-7).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ height: 0 }}
                animate={{ height: `${(entry.mood.value / 5) * 100}%` }}
                transition={{ delay: index * 0.1 }}
                className="flex-1 bg-gradient-to-t from-dark-green to-light-green rounded-t-lg relative group"
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-dark-green text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                  {entry.mood.emoji} {entry.date}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}; 