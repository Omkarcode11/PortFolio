import axios from 'axios';

// ============================================
// TYPES
// ============================================

export interface LeetCodeStats {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalQuestions: number;
  easyTotal: number;
  mediumTotal: number;
  hardTotal: number;
  acceptanceRate: number;
  ranking: number;
  username: string;
  submissionCalendar?: { [key: string]: number }; // Unix timestamp -> count
}

export interface GitHubStats {
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  totalRepos: number;
  totalStars: number;
  followers: number;
  following: number;
  contributions: number;
  topRepos: GitHubRepo[];
}

export interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

// ============================================
// LEETCODE API
// ============================================

/**
 * Fetches LeetCode user statistics using REST API
 * @param username - LeetCode username
 * @returns LeetCodeStats object or null on error
 */
export async function fetchLeetCodeStats(username: string): Promise<LeetCodeStats | null> {
  try {
    const response = await axios.get(
      `https://leetcode-stats-api.herokuapp.com/${username}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      }
    );

    const data = response.data;

    // Check if API returned success
    if (data.status !== 'success' || !data.message) {
      console.error('LeetCode API returned error:', data.message || 'Unknown error');
      return null;
    }

    // Log submissionCalendar info
    console.log('API Response - submissionCalendar:', {
      exists: !!data.submissionCalendar,
      type: typeof data.submissionCalendar,
      isObject: data.submissionCalendar && typeof data.submissionCalendar === 'object',
      keysCount: data.submissionCalendar ? Object.keys(data.submissionCalendar).length : 0,
      sampleKeys: data.submissionCalendar ? Object.keys(data.submissionCalendar).slice(0, 5) : []
    });

    // Map API response to our interface
    const result = {
      username: username,
      totalSolved: data.totalSolved || 0,
      easySolved: data.easySolved || 0,
      mediumSolved: data.mediumSolved || 0,
      hardSolved: data.hardSolved || 0,
      totalQuestions: data.totalQuestions || 0,
      easyTotal: data.totalEasy || 0,
      mediumTotal: data.totalMedium || 0,
      hardTotal: data.totalHard || 0,
      acceptanceRate: Math.round(data.acceptanceRate || 0),
      ranking: data.ranking || 0,
      submissionCalendar: data.submissionCalendar || {},
    };

    console.log('Mapped result - submissionCalendar:', {
      exists: !!result.submissionCalendar,
      keysCount: Object.keys(result.submissionCalendar).length
    });

    return result;
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.error('LeetCode user not found:', username);
    } else {
      console.error('Error fetching LeetCode stats:', error.message || error);
    }
    return null;
  }
}

// ============================================
// GITHUB API
// ============================================

/**
 * Fetches GitHub user statistics using REST API
 * @param username - GitHub username
 * @param token - Optional GitHub Personal Access Token (for higher rate limits)
 * @returns GitHubStats object or null on error
 */
export async function fetchGitHubStats(
  username: string,
  token?: string
): Promise<GitHubStats | null> {
  try {
    const headers: any = {
      'Accept': 'application/vnd.github.v3+json',
    };

    if (token) {
      headers['Authorization'] = `token ${token}`;
    }

    // Fetch user data
    const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
      headers,
      timeout: 10000,
    });

    const userData = userResponse.data;

    // Fetch repos (sorted by stars)
    const reposResponse = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=stars&per_page=100`,
      {
        headers,
        timeout: 10000,
      }
    );

    const repos = reposResponse.data;

    // Calculate total stars
    const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0);

    // Get top 3 repos
    const topRepos: GitHubRepo[] = repos
      .filter((repo: any) => !repo.fork) // Exclude forks
      .sort((a: any, b: any) => b.stargazers_count - a.stargazers_count)
      .slice(0, 3)
      .map((repo: any) => ({
        name: repo.name,
        description: repo.description || 'No description available',
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language || 'Unknown',
        url: repo.html_url,
      }));

    // Fetch contribution stats (using a workaround as GitHub API doesn't provide direct contribution count)
    // We'll use events API as an approximation
    let contributions = 0;
    try {
      const eventsResponse = await axios.get(
        `https://api.github.com/users/${username}/events/public?per_page=100`,
        {
          headers,
          timeout: 5000,
        }
      );
      contributions = eventsResponse.data.length * 10; // Rough estimate
    } catch {
      contributions = 0; // Fallback if events fetch fails
    }

    return {
      username: userData.login,
      name: userData.name || userData.login,
      bio: userData.bio || '',
      avatarUrl: userData.avatar_url,
      totalRepos: userData.public_repos,
      totalStars,
      followers: userData.followers,
      following: userData.following,
      contributions,
      topRepos,
    };
  } catch (error: any) {
    if (error.response?.status === 403) {
      console.error('GitHub API rate limit exceeded. Consider using a personal access token.');
    } else {
      console.error('Error fetching GitHub stats:', error);
    }
    return null;
  }
}

// ============================================
// CACHE UTILITIES (for client-side caching)
// ============================================

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export function getCachedData<T>(key: string): T | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data as T;
  } catch {
    return null;
  }
}

export function setCachedData<T>(key: string, data: T): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(
      key,
      JSON.stringify({
        data,
        timestamp: Date.now(),
      })
    );
  } catch (error) {
    console.error('Error caching data:', error);
  }
}
