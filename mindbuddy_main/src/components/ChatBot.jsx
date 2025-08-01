import { Send, Sparkles, User, Clock, X, MessageSquare } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Self-harm words configuration
const SELF_HARM_WORDS = [
  { word: 'suicide', threshold: 5 },
  { word: 'kill myself', threshold: 5 },
  { word: 'self-harm', threshold: 5 },
  { word: 'cut myself', threshold: 5 },
  { word: 'end my life', threshold: 5 },
  { word: 'overdose', threshold: 5 },
  { word: 'not worth living', threshold: 5 },
  { word: 'want to die', threshold: 5 },
];

class SelfHarmMonitor {
  constructor() {
    this.wordCounts = new Map();
    this.alertsSent = new Set();
  }

  async analyzeMessage(message, user) {
    const lowercaseMessage = message.toLowerCase();

    for (const { word, threshold } of SELF_HARM_WORDS) {
      if (lowercaseMessage.includes(word)) {
        const currentCount = (this.wordCounts.get(word) || 0) + 1;
        this.wordCounts.set(word, currentCount);

        if (currentCount >= threshold && !this.alertsSent.has(word)) {
          await this.sendAlert(word, currentCount, user);
          this.alertsSent.add(word);
        }
      }
    }
  }

  async sendAlert(word, count, user) {
    try {
      const templateParams = {
        to_email: 'anuragamlan41@gmail.com', // Replace with your email
        word,
        count,
        user_info: 'Anonymous User', // Replace with actual user info if available
        timestamp: new Date().toLocaleString()
      };

      await emailjs.send(
        'service_at9lejs', // Replace with your service ID
        'template_kismt0q', // Replace with your template ID
        templateParams,
        'CzuZwmVWD9l0OajTW' // Replace with your public key
      );
      
      return true;
    } catch (error) {
      console.error('Error sending alert:', error);
      return false;
    }
  }
}

const selfHarmMonitor = new SelfHarmMonitor();

const PROMPT_SUGGESTIONS = [
  "I'm feeling anxious about my future",
  "How can I improve my sleep?",
  "I'm having trouble focusing at work",
  "Ways to manage stress",
  "Help me with meditation techniques",
  "I'm feeling overwhelmed"
];

const SYSTEM_MESSAGE = {
  id: '0',
  text: "Hello! I'm **MindSync**, your mental health companion. I'm here to listen and help. How are you feeling right now?",
  sender: 'bot',
  timestamp: new Date(),
};

const formatMessageText = (text) => {
  return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
};

export const ChatBot = () => {
  const [messages, setMessages] = useState([SYSTEM_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(Date.now().toString());
  const messagesEndRef = useRef(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your API key
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  useEffect(() => {
    const savedSessions = localStorage.getItem('chatSessions');
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions);
      setChatSessions(sessions);
      
      const lastSession = sessions[sessions.length - 1];
      if (lastSession) {
        setCurrentSessionId(lastSession.id);
        setMessages(lastSession.messages);
      }
    }

    // Initialize EmailJS
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // Replace with your public key
  }, []);

  useEffect(() => {
    const currentSession = {
      id: currentSessionId,
      timestamp: new Date(),
      messages: messages,
      preview: messages.find(m => m.sender === 'user')?.text || 'New conversation'
    };

    const updatedSessions = chatSessions.filter(s => s.id !== currentSessionId);
    const newSessions = [...updatedSessions, currentSession].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    setChatSessions(newSessions);
    localStorage.setItem('chatSessions', JSON.stringify(newSessions));
  }, [messages, currentSessionId, chatSessions]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startNewChat = () => {
    setCurrentSessionId(Date.now().toString());
    setMessages([SYSTEM_MESSAGE]);
    setShowSuggestions(true);
  };

  const loadChatSession = (sessionId) => {
    const session = chatSessions.find(s => s.id === sessionId);
    if (session) {
      setCurrentSessionId(session.id);
      setMessages(session.messages);
      setShowSuggestions(false);
    }
    setShowSidebar(false);
  };

  const handleSend = async (text = input) => {
    if (!text.trim()) return;
    
    // Check for self-harm content
    await selfHarmMonitor.analyzeMessage(text, { name: 'User' });
    
    setShowSuggestions(false);
    setError(null);
    
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput('');
    setIsTyping(true);

    try {
      if (text.toLowerCase().includes('which model') || text.toLowerCase().includes('what model')) {
        const botMessage = {
          id: (Date.now() + 1).toString(),
          text: "I'm **MindSync** - your mental health companion powered by AI.",
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, botMessage]);
        return;
      }

      const conversationHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      }));

      const systemPrompt = {
        role: 'user',
        parts: [{
          text: `You are MindSync, a mental health assistant created by the MindSync team. Guidelines:
      1. **Keep responses supportive and concise** (3-5 sentences)
      2. Use **bold** to highlight important insights
      3. **Show empathy** and ask meaningful follow-up questions
      4. Suggest **breaking challenges into smaller steps** when overwhelmed
      5. Always end with a **relevant question** to encourage reflection
      6. **Prioritize safety** - recommend professional help for urgent concerns
      7. If asked about your identity: 
         - "I'm MindSync, here to support you"
         - "The MindSync team created me to help with mental wellbeing"
         - Never reference other AI systems or companies
      
      **Remember:** Your role is to be a compassionate listener who helps users organize their thoughts. Begin by asking how they are feeling today.


Current conversation:`
        }]
      };

      conversationHistory.unshift(systemPrompt);
      conversationHistory.push({
        role: 'user',
        parts: [{ text }]
      });

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: conversationHistory,
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.9,
            maxOutputTokens: 350,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || 'Failed to get response');
      }

      let botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      "I'd like to understand better. Could you tell me more about that?";

      // Add crisis resources if self-harm detected
      if (SELF_HARM_WORDS.some(item => text.toLowerCase().includes(item.word))) {
        botResponse += "\n\n**If you're in crisis**, please contact your local emergency services or a crisis hotline immediately.";
      }

      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      setError(err.message || 'Something went wrong. Please try again.');
      
      const botMessage = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting. Would you like to try again?",
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen flex bg-gradient-to-b from-light-green/50 to-light-orange/50">
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            className="w-80 bg-white/80 backdrop-blur-sm border-r border-dark-green/10 p-4 overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-dark-green">Chat History</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="text-dark-green/60 hover:text-dark-green"
              >
                <X size={20} />
              </button>
            </div>

            <button
              onClick={startNewChat}
              className="w-full mb-4 bg-dark-green text-light-orange px-4 py-2 rounded-lg hover:bg-dark-green/90 transition-colors flex items-center gap-2 justify-center"
            >
              <MessageSquare size={16} />
              New Chat
            </button>

            <div className="space-y-2">
              {chatSessions.map((session) => (
                <motion.button
                  key={session.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => loadChatSession(session.id)}
                  className={`w-full p-3 rounded-lg text-left transition-colors ${
                    session.id === currentSessionId
                      ? 'bg-dark-green text-light-orange'
                      : 'bg-light-orange/50 text-dark-green hover:bg-light-orange'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} />
                    <span className="text-sm opacity-80">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="truncate">{session.preview}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col">
        <div className="bg-dark-green p-6 text-light-orange flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">MindSync</h2>
            <p className="text-light-orange/80">Your Mental Wellness Companion</p>
          </div>
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="bg-light-orange/20 hover:bg-light-orange/30 p-2 rounded-lg transition-colors"
          >
            <Clock size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 gap-4 mb-8"
              >
                {PROMPT_SUGGESTIONS.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSend(suggestion)}
                    className="p-4 bg-light-orange rounded-xl text-left text-dark-green hover:shadow-lg transition-shadow"
                  >
                    <Sparkles className="w-4 h-4 mb-2 text-dark-green/60" />
                    {suggestion}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className="flex items-start gap-3 max-w-[80%]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === 'user' ? 'bg-dark-green text-light-orange order-2' : 'bg-light-green text-dark-green'
                }`}>
                  {message.sender === 'user' ? <User size={16} /> : <Sparkles size={16} />}
                </div>
                <div
                  className={`p-4 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-dark-green text-light-orange rounded-tr-none'
                      : 'bg-light-green text-dark-green rounded-tl-none'
                  }`}
                >
                  {formatMessageText(message.text)}
                </div>
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-dark-green/60"
            >
              <div className="w-8 h-8 rounded-full bg-light-green flex items-center justify-center">
                <Sparkles size={16} />
              </div>
              <div className="flex gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>●</span>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            >
              {error}
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        <div className="p-6 bg-white/50 backdrop-blur-sm border-t border-dark-green/10">
          <div className="max-w-4xl mx-auto flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Share your thoughts..."
              className="flex-1 px-6 py-4 rounded-xl bg-white border border-dark-green/20 focus:outline-none focus:border-dark-green shadow-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSend()}
              className="px-6 bg-dark-green text-light-orange rounded-xl hover:bg-dark-green/90 transition-colors flex items-center gap-2"
            >
              <span>Send</span>
              <Send size={20} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};