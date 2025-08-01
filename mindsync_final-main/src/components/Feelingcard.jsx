import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

export const FeelingCard = ({ feeling, isOpen, onToggle }) => {
  const Icon = feeling.icon;

  return (
    <motion.div
      layout
      onClick={() => onToggle(feeling.id)}
      className={`bg-gradient-to-br ${feeling.color} rounded-xl p-4 cursor-pointer shadow-md hover:shadow-lg transition-all border border-dark-green/10 backdrop-blur-sm min-h-[150px]`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{ height: 'auto' }}
    >
      <motion.div layout className="flex items-center gap-3 mb-3">
        <div className="p-1.5 bg-dark-green/10 rounded-lg">
          <Icon className="w-6 h-6 text-dark-green" />
        </div>
        <h3 className="text-xl font-semibold text-dark-green">{feeling.name}</h3>
      </motion.div>
      
      <motion.p
        layout
        className="text-dark-green/80 mb-3 text-sm"
      >
        {feeling.description}
      </motion.p>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ 
              opacity: 1, 
              height: 'auto',
              transition: {
                height: {
                  duration: 0.3,
                  ease: "easeOut"
                }
              }
            }}
            exit={{ 
              opacity: 0,
              height: 0,
              transition: {
                opacity: { duration: 0.15 },
                height: { duration: 0.3 }
              }
            }}
            className="space-y-3 overflow-hidden text-sm"
          >
            <div>
              <h4 className="font-semibold text-dark-green mb-1.5">Common Symptoms:</h4>
              <ul className="space-y-1.5">
                {feeling.symptoms.map((symptom, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-dark-green/80 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-dark-green/40" />
                    {symptom}
                  </motion.li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-dark-green mb-1.5">Helpful Solutions:</h4>
              <ul className="space-y-1.5">
                {feeling.solutions.map((solution, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="text-dark-green/80 flex items-center gap-1.5"
                  >
                    <span className="w-1 h-1 rounded-full bg-dark-green/40" />
                    {solution}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};