import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX } from 'lucide-react';

const breathingPatterns = [
  {
    id: 'box',
    name: 'Box Breathing',
    description: 'Equal inhale, hold, exhale, hold',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 4,
    color: 'from-blue-400 to-cyan-500'
  },
  {
    id: '478',
    name: '4-7-8 Breathing',
    description: 'Inhale 4, hold 7, exhale 8',
    inhale: 4,
    hold1: 7,
    exhale: 8,
    hold2: 0,
    color: 'from-purple-400 to-pink-500'
  },
  {
    id: 'triangle',
    name: 'Triangle Breathing',
    description: 'Equal inhale, hold, exhale',
    inhale: 4,
    hold1: 4,
    exhale: 4,
    hold2: 0,
    color: 'from-green-400 to-emerald-500'
  }
];

export const BreathingExercise = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(breathingPatterns[0]);
  const [currentPhase, setCurrentPhase] = useState('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [totalCycles, setTotalCycles] = useState(5);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Move to next phase
      const phases = ['inhale', 'hold1', 'exhale', 'hold2'].filter(phase => {
        if (phase === 'hold2') return currentPattern.hold2 > 0;
        return true;
      });
      
      const currentIndex = phases.indexOf(currentPhase);
      const nextIndex = (currentIndex + 1) % phases.length;
      const nextPhase = phases[nextIndex];
      
      if (nextPhase === 'inhale' && currentPhase !== 'inhale') {
        // Completed one cycle
        setCycle(prev => {
          if (prev >= totalCycles) {
            setIsActive(false);
            setCycle(1);
            setCurrentPhase('inhale');
            setTimeLeft(currentPattern.inhale);
            return 1;
          }
          return prev + 1;
        });
      }
      
      setCurrentPhase(nextPhase);
      setTimeLeft(currentPattern[nextPhase]);
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft, currentPhase, currentPattern, totalCycles]);

  const startExercise = () => {
    setIsActive(true);
    setCurrentPhase('inhale');
    setTimeLeft(currentPattern.inhale);
    setCycle(1);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resetExercise = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setTimeLeft(currentPattern.inhale);
    setCycle(1);
  };

  const getPhaseText = () => {
    switch (currentPhase) {
      case 'inhale': return 'Breathe In';
      case 'hold1': return 'Hold';
      case 'exhale': return 'Breathe Out';
      case 'hold2': return 'Hold';
      default: return 'Breathe In';
    }
  };

  const getCircleScale = () => {
    switch (currentPhase) {
      case 'inhale': return 1.2;
      case 'hold1': return 1.2;
      case 'exhale': return 0.8;
      case 'hold2': return 0.8;
      default: return 1;
    }
  };

  const getCircleOpacity = () => {
    switch (currentPhase) {
      case 'inhale': return 0.8;
      case 'hold1': return 0.6;
      case 'exhale': return 0.4;
      case 'hold2': return 0.2;
      default: return 0.6;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-dark-green mb-2">Breathing Exercise</h2>
        <p className="text-dark-green/70">Find your calm through guided breathing patterns</p>
      </motion.div>

      {/* Pattern Selection */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">Choose a breathing pattern:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {breathingPatterns.map((pattern, index) => (
            <motion.button
              key={pattern.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setCurrentPattern(pattern);
                setTimeLeft(pattern.inhale);
                setCurrentPhase('inhale');
              }}
              className={`p-4 rounded-2xl transition-all ${
                currentPattern.id === pattern.id
                  ? 'ring-2 ring-dark-green shadow-lg'
                  : 'hover:shadow-md'
              }`}
              style={{
                background: currentPattern.id === pattern.id 
                  ? `linear-gradient(135deg, ${pattern.color.split(' ')[0].replace('from-', '')}, ${pattern.color.split(' ')[1].replace('to-', '')})`
                  : 'white'
              }}
            >
              <h4 className={`font-semibold mb-2 ${
                currentPattern.id === pattern.id ? 'text-white' : 'text-dark-green'
              }`}>
                {pattern.name}
              </h4>
              <p className={`text-sm ${
                currentPattern.id === pattern.id ? 'text-white/80' : 'text-dark-green/70'
              }`}>
                {pattern.description}
              </p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Breathing Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-64 h-64 flex items-center justify-center">
          {/* Outer Circle */}
          <motion.div
            animate={{
              scale: getCircleScale(),
              opacity: getCircleOpacity()
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-full h-full rounded-full bg-gradient-to-r from-light-green to-light-orange border-4 border-dark-green/20"
          />
          
          {/* Middle Circle */}
          <motion.div
            animate={{
              scale: getCircleScale() * 0.8,
              opacity: getCircleOpacity() + 0.2
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-3/4 h-3/4 rounded-full bg-gradient-to-r from-light-orange to-light-green border-4 border-dark-green/30"
          />
          
          {/* Inner Circle */}
          <motion.div
            animate={{
              scale: getCircleScale() * 0.6,
              opacity: getCircleOpacity() + 0.4
            }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute w-1/2 h-1/2 rounded-full bg-gradient-to-r from-dark-green to-light-green border-4 border-light-orange/50"
          />
          
          {/* Center Text */}
          <div className="absolute text-center">
            <motion.div
              key={currentPhase}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-2xl font-bold text-dark-green mb-2"
            >
              {getPhaseText()}
            </motion.div>
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="text-4xl font-bold text-dark-green"
            >
              {timeLeft}
            </motion.div>
            <div className="text-sm text-dark-green/70 mt-2">
              Cycle {cycle}/{totalCycles}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-4 mb-8"
      >
        {!isActive ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startExercise}
            className="px-8 py-4 bg-dark-green text-light-orange rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Play size={20} />
            Start Exercise
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseExercise}
              className="px-6 py-4 bg-orange-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Pause size={20} />
              Pause
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetExercise}
              className="px-6 py-4 bg-gray-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">Exercise Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-dark-green font-medium mb-2">Number of Cycles</label>
            <select
              value={totalCycles}
              onChange={(e) => setTotalCycles(Number(e.target.value))}
              className="w-full p-3 rounded-lg border border-dark-green/20 focus:outline-none focus:border-dark-green"
            >
              {[3, 5, 7, 10].map(num => (
                <option key={num} value={num}>{num} cycles</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <label className="text-dark-green font-medium">Sound</label>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-lg bg-dark-green/10 hover:bg-dark-green/20 transition-colors"
            >
              {isMuted ? <VolumeX size={20} className="text-dark-green" /> : <Volume2 size={20} className="text-dark-green" />}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-8 bg-gradient-to-r from-light-green to-light-orange p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">How to Practice</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-green/80">
          <div>
            <h4 className="font-semibold mb-2">Find a Comfortable Position</h4>
            <p className="text-sm">Sit or lie down in a comfortable position. Close your eyes if it feels right.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Focus on Your Breath</h4>
            <p className="text-sm">Pay attention to the natural rhythm of your breathing. Don't force it.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Follow the Pattern</h4>
            <p className="text-sm">Breathe in and out according to the pattern shown. Let the circle guide you.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Be Patient</h4>
            <p className="text-sm">It may take time to get comfortable with the pattern. Be gentle with yourself.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}; 