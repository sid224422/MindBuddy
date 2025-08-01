export const APP_NAME = 'MindBuddy';

export const EMAIL_CONFIG = {
  ALERT_EMAIL: 'postman826077@gmail.com',
  SERVICE_ID: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  TEMPLATE_ID: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  PUBLIC_KEY: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
};

export const CHAT_CONFIG = {
  API_URL: import.meta.env.VITE_API_URL || 'http://localhost:8000'
};