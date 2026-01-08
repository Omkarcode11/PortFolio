import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchLeetCodeStats } from '../../../lib/statsApi';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username } = req.query;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Username is required' });
  }

  try {
    const stats = await fetchLeetCodeStats(username);

    if (!stats) {
      return res.status(404).json({ error: 'LeetCode user not found or API unavailable' });
    }

    // Cache for 1 hour
    res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=7200');

    return res.status(200).json(stats);
  } catch (error) {
    console.error('Error in LeetCode API route:', error);
    return res.status(500).json({ error: 'Failed to fetch LeetCode stats' });
  }
}
