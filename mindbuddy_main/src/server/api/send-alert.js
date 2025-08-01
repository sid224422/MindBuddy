import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

const ALERT_EMAIL = 'postman826077@gmail.com';

export async function POST(req) {
  const { word, count, user, timestamp } = await req.json();

  const userInfo = typeof user === 'string' 
    ? 'Anonymous User'
    : `${user.name} (${user.age}, ${user.gender})`;

  const emailContent = `
    <h1 style="color: #ff0000;">🚨 MindSync Alert: Self-Harm Risk Detected</h1>
    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
      <p><strong>Concerning Word/Phrase:</strong> "${word}"</p>
      <p><strong>Usage Count:</strong> ${count}</p>
      <p><strong>User Information:</strong> ${userInfo}</p>
      <p><strong>Timestamp:</strong> ${new Date(timestamp).toLocaleString()}</p>
    </div>
    <p style="color: #ff0000; font-weight: bold;">URGENT: Immediate attention required. Please review the conversation history.</p>
    <hr>
    <p style="font-size: 12px; color: #666;">
      This is an automated alert from the MindSync Mental Health Platform.
      Please take appropriate action based on your crisis response protocols.
    </p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: ALERT_EMAIL,
    subject: `🚨 URGENT: MindSync Self-Harm Alert - "${word}"`,
    html: emailContent
  };

  try {
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to send email alert' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}