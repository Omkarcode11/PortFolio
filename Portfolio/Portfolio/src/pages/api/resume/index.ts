import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Resume from '../../../models/Resume';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  if (method === 'GET') {
    try {
      const resume = await Resume.findOne();
      res.status(200).json({ success: true, data: resume });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'PUT') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const resume = await Resume.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.status(200).json({ success: true, data: resume });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
