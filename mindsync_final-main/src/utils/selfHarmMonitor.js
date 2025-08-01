import { sendAlertEmail } from './emailService';

export const selfHarmWords = [
  { word: 'suicide', threshold: 5 },
  { word: 'kill myself', threshold: 5 },
  { word: 'self-harm', threshold: 6 },
  { word: 'cut myself', threshold: 6 },
  { word: 'end my life', threshold: 5 },
  { word: 'overdose', threshold: 5 },
  { word: 'not worth living', threshold: 6 },
  { word: 'want to die', threshold: 5 },
  { word: 'pain too much', threshold: 6 },
  { word: 'hopeless', threshold: 7 },
  { word: 'depressed', threshold: 7 },
  { word: "can't take it anymore", threshold: 6 },
  { word: 'no point in life', threshold: 6 },
  { word: 'dying', threshold: 5 },
  { word: 'hurting myself', threshold: 6 },
  { word: 'jumping off', threshold: 5 },
  { word: 'no future', threshold: 7 },
  { word: 'nobody cares', threshold: 7 },
  { word: 'crying all the time', threshold: 8 },
  { word: 'feeling empty', threshold: 8 },
  { word: 'my life is over', threshold: 5 },
  { word: 'want to disappear', threshold: 6 },
  { word: 'everything is pointless', threshold: 6 },
  { word: 'no reason to live', threshold: 5 },
  { word: 'feel like giving up', threshold: 6 },
  { word: "can't stop hurting myself", threshold: 5 },
  { word: 'too much pain', threshold: 7 },
  { word: "don't want to be here", threshold: 5 },
  { word: 'giving up', threshold: 6 },
  { word: 'I hate my life', threshold: 7 },
  { word: 'nobody would miss me', threshold: 6 },
  { word: 'I feel dead inside', threshold: 7 }
];

class SelfHarmMonitor {
  constructor() {
    this.wordCounts = new Map();
    this.alertsSent = new Set();
  }

  async analyzeMessage(message, user) {
    const lowercaseMessage = message.toLowerCase();

    for (const { word, threshold } of selfHarmWords) {
      if (lowercaseMessage.includes(word)) {
        const currentCount = (this.wordCounts.get(word) || 0) + 1;
        this.wordCounts.set(word, currentCount);

        console.log(`Word "${word}" count: ${currentCount}, threshold: ${threshold}`);

        if (currentCount >= threshold && !this.alertsSent.has(word)) {
          const success = await this.sendAlert(word, currentCount, user);
          if (success) {
            this.alertsSent.add(word);
            console.log(`Alert sent for word "${word}"`);
          }
        }
      }
    }
  }

  async sendAlert(word, count, user) {
    try {
      return await sendAlertEmail(
        word,
        count,
        user ? {
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender
        } : 'Anonymous User',
        new Date().toISOString()
      );
    } catch (error) {
      console.error('Error sending alert:', error);
      return false;
    }
  }

  resetCounts() {
    this.wordCounts.clear();
    this.alertsSent.clear();
  }

  getWordCount(word) {
    return this.wordCounts.get(word) || 0;
  }
}

export const selfHarmMonitor = new SelfHarmMonitor();