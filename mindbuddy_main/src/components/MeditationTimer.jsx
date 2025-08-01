import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Clock, Sun, Moon, CloudRain, Waves } from 'lucide-react';

const ambientSounds = [
  {
    id: 'rain',
    name: 'Rain',
    icon: CloudRain,
    color: 'from-blue-400 to-cyan-500',
    audio: '/src/assets/audio/rain.mp3'
  },
  {
    id: 'ocean',
    name: 'Ocean Waves',
    icon: Waves,
    color: 'from-cyan-400 to-blue-500',
    audio: '/src/assets/audio/ocean.mp3'
  },
  {
    id: 'forest',
    name: 'Forest',
    icon: Sun,
    color: 'from-green-400 to-emerald-500',
    audio: '/src/assets/audio/forest.mp3'
  },
  {
    id: 'night',
    name: 'Night Sounds',
    icon: Moon,
    color: 'from-purple-400 to-indigo-500',
    audio: '/src/assets/audio/night.mp3'
  }
];

const presetTimes = [
  { label: '5 min', value: 5 * 60 },
  { label: '10 min', value: 10 * 60 },
  { label: '15 min', value: 15 * 60 },
  { label: '20 min', value: 20 * 60 },
  { label: '30 min', value: 30 * 60 }
];

export const MeditationTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10 * 60); // 10 minutes default
  const [selectedSound, setSelectedSound] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setSessionComplete(true);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
    
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  useEffect(() => {
    if (selectedSound && !isMuted && isActive) {
      if (audioRef.current) {
        audioRef.current.volume = volume;
        audioRef.current.loop = true;
        audioRef.current.play().catch(console.error);
      }
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [selectedSound, isMuted, isActive, volume]);

  const startTimer = () => {
    setIsActive(true);
    setSessionComplete(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(10 * 60);
    setSessionComplete(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = 10 * 60; // 10 minutes
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const handleSoundSelect = (sound) => {
    setSelectedSound(sound);
    if (audioRef.current) {
      audioRef.current.src = sound.audio;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h2 className="text-3xl font-bold text-dark-green mb-2">Meditation Timer</h2>
        <p className="text-dark-green/70">Find your inner peace with guided meditation sessions</p>
      </motion.div>

      {/* Timer Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-8"
      >
        <div className="relative w-80 h-80 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ strokeDasharray: "0 283" }}
              animate={{ strokeDasharray: `${(getProgress() / 100) * 283} 283` }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00110B" />
                <stop offset="100%" stopColor="#E4FFE2" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Center Content */}
          <div className="absolute text-center">
            <motion.div
              key={timeLeft}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-6xl font-bold text-dark-green mb-4"
            >
              {formatTime(timeLeft)}
            </motion.div>
            <div className="text-lg text-dark-green/70">
              {isActive ? 'Meditating...' : 'Ready to begin'}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center gap-4 mb-8"
      >
        {!isActive ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTimer}
            className="px-8 py-4 bg-dark-green text-light-orange rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Play size={20} />
            Start Meditation
          </motion.button>
        ) : (
          <>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={pauseTimer}
              className="px-6 py-4 bg-orange-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Pause size={20} />
              Pause
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetTimer}
              className="px-6 py-4 bg-gray-500 text-white rounded-2xl font-semibold hover:shadow-lg transition-all flex items-center gap-2"
            >
              <RotateCcw size={20} />
              Reset
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Session Complete Modal */}
      <AnimatePresence>
        {sessionComplete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-2xl text-center max-w-md mx-4"
            >
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-2xl font-bold text-dark-green mb-2">Session Complete!</h3>
              <p className="text-dark-green/70 mb-6">Great job! You've completed your meditation session.</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSessionComplete(false)}
                className="px-6 py-3 bg-dark-green text-light-orange rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Settings Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center mb-6"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSettings(!showSettings)}
          className="px-6 py-3 bg-light-orange/50 text-dark-green rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 mx-auto"
        >
          <Clock size={20} />
          {showSettings ? 'Hide Settings' : 'Show Settings'}
        </motion.button>
      </motion.div>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-8 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Timer Presets */}
              <div>
                <h3 className="text-xl font-semibold text-dark-green mb-4">Session Duration</h3>
                <div className="grid grid-cols-3 gap-3">
                  {presetTimes.map((preset) => (
                    <motion.button
                      key={preset.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setTimeLeft(preset.value);
                        resetTimer();
                      }}
                      className={`p-3 rounded-xl font-semibold transition-all ${
                        timeLeft === preset.value
                          ? 'bg-dark-green text-light-orange'
                          : 'bg-light-orange/50 text-dark-green hover:bg-light-orange'
                      }`}
                    >
                      {preset.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Ambient Sounds */}
              <div>
                <h3 className="text-xl font-semibold text-dark-green mb-4">Ambient Sounds</h3>
                <div className="grid grid-cols-2 gap-3">
                  {ambientSounds.map((sound) => {
                    const Icon = sound.icon;
                    const isSelected = selectedSound?.id === sound.id;
                    
                    return (
                      <motion.button
                        key={sound.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSoundSelect(sound)}
                        className={`p-3 rounded-xl transition-all flex items-center gap-2 ${
                          isSelected 
                            ? 'ring-2 ring-dark-green shadow-lg' 
                            : 'hover:shadow-md'
                        }`}
                        style={{
                          background: isSelected 
                            ? `linear-gradient(135deg, ${sound.color.split(' ')[0].replace('from-', '')}, ${sound.color.split(' ')[1].replace('to-', '')})`
                            : 'white'
                        }}
                      >
                        <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-dark-green'}`} />
                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-dark-green'}`}>
                          {sound.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
                
                {/* Sound Controls */}
                {selectedSound && (
                  <div className="mt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setIsMuted(!isMuted)}
                        className="p-2 rounded-lg bg-dark-green/10 hover:bg-dark-green/20 transition-colors"
                      >
                        {isMuted ? <VolumeX size={16} className="text-dark-green" /> : <Volume2 size={16} className="text-dark-green" />}
                      </motion.button>
                      <span className="text-sm text-dark-green/70">Sound</span>
                    </div>
                    
                    {!isMuted && (
                      <div>
                        <label className="block text-sm text-dark-green/70 mb-2">Volume</label>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.1"
                          value={volume}
                          onChange={(e) => setVolume(Number(e.target.value))}
                          className="w-full h-2 bg-light-orange rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Instructions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-gradient-to-r from-light-green to-light-orange p-6 rounded-2xl"
      >
        <h3 className="text-xl font-semibold text-dark-green mb-4">Meditation Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-dark-green/80">
          <div>
            <h4 className="font-semibold mb-2">Find Your Space</h4>
            <p className="text-sm">Choose a quiet, comfortable place where you won't be disturbed.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Get Comfortable</h4>
            <p className="text-sm">Sit in a comfortable position with your back straight but relaxed.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Focus on Your Breath</h4>
            <p className="text-sm">Pay attention to your natural breathing rhythm without trying to change it.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Be Patient</h4>
            <p className="text-sm">Your mind will wander - that's normal. Gently bring your focus back to your breath.</p>
          </div>
        </div>
      </motion.div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto" />
    </div>
  );
}; 