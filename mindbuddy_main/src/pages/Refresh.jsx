import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Play, SkipBack, SkipForward, Music, Moon, Sun, Cloud, Wind, Phone, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import audio files from assets
import rainSound from '../assets/audio/rain.mp3';
import oceanSound from '../assets/audio/ocean.mp3';
import forestSound from '../assets/audio/forest.mp3';
import nightSound from '../assets/audio/night.mp3';

export const Refresh = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSound, setCurrentSound] = useState(null);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Create audio refs
  const rainAudioRef = useRef(new Audio(rainSound));
  const oceanAudioRef = useRef(new Audio(oceanSound));
  const forestAudioRef = useRef(new Audio(forestSound));
  const nightAudioRef = useRef(new Audio(nightSound));

  useEffect(() => {
    let interval;
    
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isTimerRunning, timer]);

  useEffect(() => {
    // Handle audio playback when currentSound changes
    const audioRefs = {
      'Rain': rainAudioRef,
      'Ocean': oceanAudioRef,
      'Forest': forestAudioRef,
      'Night': nightAudioRef
    };

    if (currentSound) {
      const audio = audioRefs[currentSound].current;
      audio.loop = true;
      
      if (isPlaying) {
        audio.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audio.pause();
      }
    }

    return () => {
      // Cleanup - pause all audio when component unmounts
      Object.values(audioRefs).forEach(ref => {
        ref.current.pause();
      });
    };
  }, [currentSound, isPlaying]);

  const sounds = [
    { name: 'Rain', icon: Cloud, audioRef: rainAudioRef },
    { name: 'Ocean', icon: Wind, audioRef: oceanAudioRef },
    { name: 'Forest', icon: Sun, audioRef: forestAudioRef },
    { name: 'Night', icon: Moon, audioRef: nightAudioRef },
  ];

  const exercises = [
    {
      title: '4-7-8 Breathing',
      description: 'Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds',
      duration: '1 minute'
    },
    {
      title: 'Progressive Muscle Relaxation',
      description: 'Tense and relax each muscle group from toes to head',
      duration: '5 minutes'
    },
    {
      title: 'Mindful Walking',
      description: 'Walk slowly and focus on each step and breath',
      duration: '3 minutes'
    },
    {
      title: 'Gratitude Practice',
      description: 'List three things you are grateful for right now',
      duration: '2 minutes'
    }
  ];

  const helplines = [
    {
      name: 'NIMHANS',
      number: '080-46110007',
      description: 'National Institute of Mental Health and Neurosciences'
    },
    {
      name: 'Vandrevala Foundation',
      number: '1860-2662-345',
      description: '24/7 mental health helpline'
    },
    {
      name: 'Aasra',
      number: '9820466726',
      description: 'Available 24x7 for emotional crisis and suicide prevention'
    },
    {
      name: 'Sneha Foundation',
      number: '044-24640050',
      description: 'Suicide prevention and mental health support'
    },
    {
      name: 'iCall',
      number: '022-25521111',
      description: 'Psychosocial helpline by TISS'
    },
    {
      name: 'Parivarthan',
      number: '+91-7676602602',
      description: 'Counselling helpline'
    }
  ];

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSoundClick = (soundName) => {
    if (currentSound === soundName) {
      // Toggle play/pause for current sound
      setIsPlaying(!isPlaying);
    } else {
      // Stop any currently playing sound and start new one
      if (currentSound) {
        const currentAudio = sounds.find(s => s.name === currentSound)?.audioRef.current;
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }
      setCurrentSound(soundName);
      setIsPlaying(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-light-green via-light-orange to-light-green p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-dark-green hover:text-dark-green/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-dark-green mb-8 text-center"
        >
          Refresh Your Mind
        </motion.h1>

        {/* Emergency Helplines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg border-2 border-red-500/20"
        >
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-semibold text-dark-green">Mental Health Helplines (India)</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {helplines.map((helpline, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-white/50 hover:bg-white/70 transition-colors"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-2">{helpline.name}</h3>
                <p className="text-dark-green/80 mb-3">{helpline.description}</p>
                <a
                  href={`tel:${helpline.number}`}
                  className="inline-flex items-center gap-2 bg-dark-green text-light-orange px-4 py-2 rounded-lg hover:bg-dark-green/90 transition-colors"
                >
                  <Phone size={16} />
                  {helpline.number}
                </a>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Meditation Timer */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-dark-green mb-6">Meditation Timer</h2>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-bold text-dark-green mb-8">
              {formatTime(timer)}
            </div>
            <div className="flex gap-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTimer(Math.max(60, timer - 60))}
                className="p-3 rounded-full bg-dark-green text-light-orange"
                disabled={isTimerRunning}
              >
                <SkipBack size={24} />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="p-3 rounded-full bg-dark-green text-light-orange"
              >
                {isTimerRunning ? <Pause size={24} /> : <Play size={24} />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setTimer(timer + 60)}
                className="p-3 rounded-full bg-dark-green text-light-orange"
                disabled={isTimerRunning}
              >
                <SkipForward size={24} />
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Ambient Sounds */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <Music className="w-6 h-6 text-dark-green" />
            <h2 className="text-2xl font-semibold text-dark-green">Ambient Sounds</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {sounds.map((sound, index) => {
              const Icon = sound.icon;
              const isActive = currentSound === sound.name && isPlaying;
              return (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSoundClick(sound.name)}
                  className={`p-6 rounded-xl flex flex-col items-center gap-3 transition-colors ${
                    isActive
                      ? 'bg-dark-green text-light-orange'
                      : 'bg-light-orange/50 text-dark-green hover:bg-light-orange'
                  }`}
                >
                  <Icon size={24} />
                  <span className="font-medium">{sound.name}</span>
                  {isActive && (
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-light-orange animate-pulse" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-1 rounded-full bg-light-orange animate-pulse" style={{ animationDelay: '150ms' }} />
                      <div className="w-1 h-1 rounded-full bg-light-orange animate-pulse" style={{ animationDelay: '300ms' }} />
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Exercises */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-8 shadow-lg"
        >
          <h2 className="text-2xl font-semibold text-dark-green mb-6">Quick Exercises</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {exercises.map((exercise, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-xl bg-light-orange/30 hover:bg-light-orange/50 transition-colors"
              >
                <h3 className="text-xl font-semibold text-dark-green mb-2">{exercise.title}</h3>
                <p className="text-dark-green/80 mb-3">{exercise.description}</p>
                <p className="text-sm font-medium text-dark-green/60">{exercise.duration}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};