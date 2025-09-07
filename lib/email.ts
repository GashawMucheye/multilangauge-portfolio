import nodemailer from 'nodemailer';

interface SendEmailParams {
  name: string;
  email: string;
  message: string;
}

export async function sendEmail({ name, email, message }: SendEmailParams) {
  const EMAIL_HOST = process.env.EMAIL_HOST || '';
  const EMAIL_PORT = process.env.EMAIL_PORT || '587';
  const EMAIL_USER = process.env.EMAIL_USER || '';
  const EMAIL_PASS = process.env.EMAIL_PASS || '';
  const EMAIL_FROM = process.env.EMAIL_FROM || '';
  const EMAIL_TO = process.env.EMAIL_TO || '';

  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: parseInt(EMAIL_PORT, 10),
    secure: parseInt(EMAIL_PORT, 10) === 465, // true for 465, false otherwise
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail({
    from: `"${name}" <${EMAIL_FROM}>`,
    to: EMAIL_TO,
    subject: `New message from ${name} via portfolio contact form`,
    text: message,
    replyTo: email,
  });
}
