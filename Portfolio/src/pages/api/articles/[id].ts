import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/dbConnect';
import Article from '../../../models/Article';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const { id } = req.query;
  await dbConnect();

  if (method === 'GET') {
    try {
      const article = await Article.findById(id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.status(200).json({ success: true, data: article });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'PUT' || method === 'PATCH') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const article = await Article.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.status(200).json({ success: true, data: article });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (method === 'DELETE') {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    try {
      const article = await Article.findByIdAndDelete(id);
      if (!article) {
        return res.status(404).json({ success: false, error: 'Article not found' });
      }
      res.status(200).json({ success: true, message: 'Article deleted successfully' });
    } catch (error: any) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

