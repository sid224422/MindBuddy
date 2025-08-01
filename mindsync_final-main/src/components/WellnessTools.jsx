import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Radiation as Meditation, Dumbbell, BookOpen, Brain, Music, Sun } from 'lucide-react';
import { Link } from 'react-router-dom';

const tools = [
  {
    id: 1,
    icon: Meditation,
    title: 'Guided Meditation',
    description: 'Follow along with calming meditation exercises',
    color: 'from-purple-100 to-blue-100',
    details: [
      'Progressive relaxation techniques',
      'Mindful breathing exercises',
      'Body scan meditation',
      'Loving-kindness meditation'
    ]
  },
  {
    id: 2,
    icon: Brain,
    title: 'Mindfulness Exercises',
    description: 'Practice being present in the moment',
    color: 'from-blue-100 to-indigo-100',
    details: [
      '5-4-3-2-1 grounding technique',
      'Mindful walking practice',
      'Present moment awareness',
      'Sensory observation exercises'
    ]
  },
  {
    id: 3,
    icon: Music,
    title: 'Calming Sounds',
    description: 'Soothing audio for relaxation and focus',
    color: 'from-pink-100 to-rose-100',
    details: [
      'Nature soundscapes',
      'Binaural beats',
      'Ambient music',
      'White noise tracks'
    ]
  }
];

export const WellnessTools = () => {
  const [openTool, setOpenTool] = React.useState(null);

  const handleToggle = (id) => {
    setOpenTool(prev => prev === id ? null : id);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <div key={tool.id} className="relative">
          <ToolCard 
            tool={tool}
            isOpen={openTool === tool.id}
            onToggle={handleToggle}
          />
        </div>
      ))}
    </div>
  );
};

const ToolCard = ({ tool, isOpen, onToggle }) => {
  const Icon = tool.icon;

  return (
    <motion.div
      layout
      className={`bg-gradient-to-br ${tool.color} rounded-2xl cursor-pointer shadow-lg hover:shadow-xl transition-all border border-dark-green/10 backdrop-blur-sm overflow-hidden`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div onClick={() => onToggle(tool.id)} className="p-6">
        <motion.div layout className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-dark-green/10 rounded-xl">
            <Icon className="w-8 h-8 text-dark-green" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-dark-green">{tool.title}</h3>
            <p className="text-dark-green/80 text-sm">{tool.description}</p>
          </div>
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                height: {
                  duration: 0.4,
                  ease: "easeOut"
                }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.2 },
                height: { duration: 0.4 }
              }
            }}
            className="px-6 pb-6"
          >
            <div>
              <h4 className="font-semibold text-dark-green mb-2">Features:</h4>
              <ul className="space-y-2 mb-4">
                {tool.details.map((detail, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="text-dark-green/80 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-dark-green/40" />
                    {detail}
                  </motion.li>
                ))}
              </ul>
              
              <Link to={`/refresh?tool=${tool.id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-dark-green text-white py-2 px-4 rounded-lg hover:bg-dark-green/90 transition-colors"
                >
                  Try {tool.title}
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};