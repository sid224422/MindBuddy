import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Heart, Clock, TrendingUp, Sparkles, ArrowRight } from 'lucide-react';
import { MoodTracker } from '../components/MoodTracker';
import { BreathingExercise } from '../components/BreathingExercise';
import { MeditationTimer } from '../components/MeditationTimer';
import { ProgressDashboard } from '../components/ProgressDashboard';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const tools = [
  {
    id: 'mood-tracker',
    name: 'Mood Tracker',
    description: 'Track your daily emotions and activities to understand your patterns',
    icon: Heart,
    color: 'from-pink-400 to-rose-500',
    component: MoodTracker
  },
  {
    id: 'breathing',
    name: 'Breathing Exercises',
    description: 'Guided breathing patterns to help you find calm and reduce stress',
    icon: Brain,
    color: 'from-blue-400 to-cyan-500',
    component: BreathingExercise
  },
  {
    id: 'meditation',
    name: 'Meditation Timer',
    description: 'Customizable meditation sessions with ambient sounds and progress tracking',
    icon: Clock,
    color: 'from-purple-400 to-indigo-500',
    component: MeditationTimer
  },
  {
    id: 'progress',
    name: 'Progress Dashboard',
    description: 'Visualize your wellness journey with detailed analytics and achievements',
    icon: TrendingUp,
    color: 'from-green-400 to-emerald-500',
    component: ProgressDashboard
  }
];

export const Tools = () => {
  const [selectedTool, setSelectedTool] = useState(null);

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
  };

  const handleBack = () => {
    setSelectedTool(null);
  };

  if (selectedTool) {
    const ToolComponent = selectedTool.component;
    return (
      <div className="min-h-screen bg-gradient-to-br from-light-green via-light-orange to-light-green">
        <Header />
        <main className="pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="container mx-auto px-4 py-6"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBack}
              className="mb-6 flex items-center gap-2 text-dark-green hover:text-dark-green/80 transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
              Back to Tools
            </motion.button>
            <ToolComponent />
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green via-light-orange to-light-green">
      <Header />
      <main className="pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="mb-6"
            >
              <Sparkles className="w-16 h-16 mx-auto text-dark-green" />
            </motion.div>
            <h1 className="text-5xl font-bold text-dark-green mb-6">Wellness Tools</h1>
            <p className="text-xl text-dark-green/80 max-w-3xl mx-auto">
              Discover a collection of interactive tools designed to support your mental wellness journey. 
              Each tool is crafted with care to help you find balance and peace.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              return (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group cursor-pointer"
                  onClick={() => handleToolSelect(tool)}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-soft hover:shadow-glow transition-all duration-300 border border-dark-green/10">
                    <div className="flex items-start gap-6">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className={`p-4 rounded-2xl bg-gradient-to-r ${tool.color} shadow-lg`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-dark-green mb-3 group-hover:text-dark-green/80 transition-colors">
                          {tool.name}
                        </h3>
                        <p className="text-dark-green/70 mb-6 leading-relaxed">
                          {tool.description}
                        </p>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.2 }}
                          className="flex items-center gap-2 text-dark-green font-semibold group-hover:gap-3 transition-all"
                        >
                          <span>Explore Tool</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-24 max-w-4xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-dark-green text-center mb-12">Why Choose Our Tools?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Interactive & Engaging',
                  description: 'Beautiful animations and intuitive interfaces make your wellness practice enjoyable',
                  icon: Sparkles,
                  color: 'from-yellow-400 to-orange-500'
                },
                {
                  title: 'Evidence-Based',
                  description: 'All tools are designed based on proven mental health and wellness techniques',
                  icon: Brain,
                  color: 'from-blue-400 to-cyan-500'
                },
                {
                  title: 'Personalized Experience',
                  description: 'Track your progress and customize your experience to fit your unique needs',
                  icon: Heart,
                  color: 'from-pink-400 to-rose-500'
                }
              ].map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-dark-green mb-3">{feature.title}</h3>
                    <p className="text-dark-green/70 leading-relaxed">{feature.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-24 text-center"
          >
            <div className="bg-gradient-to-r from-light-green to-light-orange p-8 rounded-3xl shadow-soft">
              <h3 className="text-2xl font-bold text-dark-green mb-4">Ready to Start Your Journey?</h3>
              <p className="text-dark-green/70 mb-6 max-w-2xl mx-auto">
                Choose any tool above to begin your personalized wellness experience. 
                Remember, every small step counts towards better mental health.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleToolSelect(tools[0])}
                className="inline-flex items-center gap-3 bg-dark-green text-light-orange px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transition-all"
              >
                <Heart className="w-5 h-5" />
                Start with Mood Tracker
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}; 