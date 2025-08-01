const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Generate a random user ID for demo purposes
const USER_ID = Math.random().toString(36).substring(7);

export async function sendMessage(message) {
  try {
    const response = await fetch(`${API_URL}/chat/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: USER_ID,
        message: message,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    // Return a fallback response when offline or API fails
    return getMockResponse(message);
  }
}

// Fallback response for when API is not available
export async function getMockResponse(message) {
  await new Promise(resolve => setTimeout(resolve, 1000));

  const responses = [
    "I understand how you're feeling. Can you tell me more about what's troubling you?",
    "That sounds challenging. How long have you been experiencing these feelings?",
    "I hear you. Let's explore some coping strategies together. What has helped you in the past?",
    "Your feelings are valid. Would you like to try some breathing exercises together?",
    "Thank you for sharing that with me. How does this situation affect your daily life?"
  ];

  return responses[Math.floor(Math.random() * responses.length)];
}