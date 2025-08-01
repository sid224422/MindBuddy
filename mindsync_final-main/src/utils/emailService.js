import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendAlertEmail(word, count, user, timestamp) {
  const userInfo = typeof user === 'string' 
    ? 'Anonymous User'
    : `${user.name} (${user.age}, ${user.gender})`;

  const templateParams = {
    to_email: 'anuragamlan41@gmail.com',
    word,
    count,
    user_info: userInfo,
    timestamp: new Date(timestamp).toLocaleString()
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('Email sent successfully:', response);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}