import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const filePath = path.join(process.cwd(), 'public', 'sitemap.xml');
    const xml = fs.readFileSync(filePath, 'utf8');
    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=86400');
    return res.status(200).send(xml);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to load sitemap' });
  }
}
