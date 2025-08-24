'use server';
/**
 * @fileOverview A flow for sending a contact email.
 *
 * - sendContactEmail - A function that handles sending the contact form email.
 * - ContactEmailInput - The input type for the sendContactEmail function.
 */

// import { ai } from '@/ai/genkit';
import { z } from 'zod';
import * as nodemailer from 'nodemailer';
import { ai } from '../genkit';
import { ZodTypeAny } from 'zod/v3';

const ContactEmailInputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
});
export type ContactEmailInput = z.infer<typeof ContactEmailInputSchema>;

export async function sendContactEmail(
  input: ContactEmailInput
): Promise<{ success: boolean }> {
  return sendEmailFlow(input);
}

const sendEmailFlow = ai.defineFlow(
  {
    name: 'sendEmailFlow',
    inputSchema: ContactEmailInputSchema,
    outputSchema: z.object({ success: z.boolean() }),
  },
  async (input) => {
    const { name, email, message } = input;

    const {
      EMAIL_HOST,
      EMAIL_PORT,
      EMAIL_USER,
      EMAIL_PASS,
      EMAIL_FROM,
      EMAIL_TO,
    } = process.env;

    if (
      !EMAIL_HOST ||
      !EMAIL_PORT ||
      !EMAIL_USER ||
      !EMAIL_PASS ||
      !EMAIL_FROM ||
      !EMAIL_TO
    ) {
      throw new Error('Email environment variables are not configured.');
    }

    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: parseInt(EMAIL_PORT, 10),
      secure: parseInt(EMAIL_PORT, 10) === 465, // true for 465, false for other ports
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${EMAIL_FROM}>`,
      to: EMAIL_TO,
      subject: `New message from ${name} via portfolio contact form`,
      text: message,
      replyTo: email,
    };

    try {
      await transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Failed to send email:', error);
      throw new Error('Failed to send email.');
    }
  }
);
