import type { NextApiRequest, NextApiResponse } from 'next';

interface ContactRequestBody {
  name: string;
  email: string;
  company?: string;
  service?: string;
  message: string;
  budget?: string;
  timeline?: string;
  honeypot?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, company, service, message, budget, timeline, honeypot }: ContactRequestBody = req.body;

    // Honeypot spam protection
    if (honeypot) {
      // Silently discard bot submission
      return res.status(200).json({ success: true, message: 'Inquiry received' });
    }

    // Validation
    if (!name || !name.trim()) {
      return res.status(400).json({ success: false, message: 'Please provide your name.' });
    }

    if (!email || !email.trim() || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({ success: false, message: 'Please provide details about what you want to build (at least 10 characters).' });
    }

    // Log the inquiry for record keeping
    console.log('--- NEW PROJECT INQUIRY ---');
    console.log(`From: ${name} <${email}>`);
    if (company) console.log(`Company: ${company}`);
    if (service) console.log(`Service Area: ${service}`);
    if (budget) console.log(`Budget: ${budget}`);
    if (timeline) console.log(`Timeline: ${timeline}`);
    console.log(`Details: ${message}`);
    console.log('---------------------------');

    return res.status(200).json({
      success: true,
      message: 'Thank you! Your project inquiry has been received. I will review it and get back to you within 24 hours.',
    });
  } catch (error) {
    console.error('Error handling contact submission:', error);
    return res.status(500).json({ success: false, message: 'Failed to process inquiry. Please email directly.' });
  }
}
