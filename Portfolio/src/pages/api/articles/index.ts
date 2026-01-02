import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Article';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  await dbConnect();

  if (method === 'GET') {
    try {
      const articles = await Article.find({}).sort({ date: -1 });
      res.status(200).json({ success: true, data: articles });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  } else if (method === 'POST') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const article = await Article.create(req.body);
      res.status(201).json({ success: true, data: article });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
