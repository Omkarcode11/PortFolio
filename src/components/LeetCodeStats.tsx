import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { fetchLeetCodeStats, LeetCodeStats as LeetCodeStatsType, getCachedData, setCachedData } from '../lib/statsApi';
import { SiLeetcode } from 'react-icons/si';

interface LeetCodeStatsProps {
  username: string;
}

interface ProgressBarProps {
  label: string;
  solved: number;
  total: number;
  color: string;
  delay: number;
}

const ProgressBar = ({ label, solved, total, color, delay }: ProgressBarProps) => {
  const percentage = total > 0 ? (solved / total) * 100 : 0;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm">
        <span className="text-[var(--text-secondary)] font-medium">{label}</span>
        <span className="text-[var(--text-primary)] font-bold">
          {solved}<span className="text-[var(--text-secondary)] font-normal">/{total}</span>
        </span>
      </div>
      <div className="relative h-2 bg-[var(--bg-card)] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="p-6 rounded-2xl bg-[var(--bg-secondary)]/30 border border-[var(--border-color)]">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-[var(--bg-card)] rounded-xl animate-pulse" />
      <div className="flex-1">
        <div className="h-4 bg-[var(--bg-card)] rounded w-24 mb-2 animate-pulse" />
        <div className="h-3 bg-[var(--bg-card)] rounded w-32 animate-pulse" />
      </div>
    </div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-2">
          <div className="h-3 bg-[var(--bg-card)] rounded w-20 animate-pulse" />
          <div className="h-2 bg-[var(--bg-card)] rounded-full animate-pulse" />
        </div>
      ))}
    </div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
        <span className="text-red-500 text-xl">⚠️</span>
      </div>
      <div>
        <h4 className="font-bold text-red-500">Failed to load LeetCode stats</h4>
        <p className="text-sm text-[var(--text-secondary)]">Unable to fetch data</p>
      </div>
    </div>
    <button
      onClick={onRetry}
      className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-semibold transition-colors"
    >
      Retry
    </button>
  </motion.div>
);

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = value;
    const increment = Math.ceil(end / 50); // Divide into 50 steps
    const incrementTime = (duration * 1000) / 50;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function LeetCodeStats({ username }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<LeetCodeStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);

    // Check cache first
    const cacheKey = `leetcode_${username}`;
    const cachedStats = getCachedData<LeetCodeStatsType>(cacheKey);

    if (cachedStats) {
      setStats(cachedStats);
      setLoading(false);
      return;
    }

    // Fetch fresh data
    const freshStats = await fetchLeetCodeStats(username);

    if (freshStats) {
      setStats(freshStats);
      setCachedData(cacheKey, freshStats);
      setError(false);
    } else {
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, [username]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !stats) {
    return <ErrorState onRetry={loadStats} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Card */}
      <div className="relative p-6 rounded-2xl bg-gradient-to-br from-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]/30 border border-[var(--border-color)] hover:border-orange-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/5">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
              <SiLeetcode className="text-orange-500" size={20} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[var(--text-primary)]">LeetCode</h3>
              <a
                href={`https://leetcode.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-500 hover:text-orange-400 hover:underline transition-colors flex items-center gap-1"
              >
                @{username}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Ranking Badge */}
          {stats.ranking > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30"
            >
              <div className="flex items-center gap-1.5">
                <span className="text-orange-500 text-xs">🏆</span>
                <span className="text-orange-500 font-bold text-xs">
                  #{stats.ranking.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* Main Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center p-4 rounded-xl bg-[var(--bg-card)]/50 border border-[var(--border-color)]"
          >
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-1">
              <AnimatedCounter value={stats.totalSolved} />
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
              Problems Solved
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center p-4 rounded-xl bg-[var(--bg-card)]/50 border border-[var(--border-color)]"
          >
            <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-1">
              <AnimatedCounter value={stats.acceptanceRate} />%
            </div>
            <div className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">
              Acceptance Rate
            </div>
          </motion.div>
        </div>

        {/* Progress Bars */}
        <div className="space-y-4">
          <ProgressBar
            label="Easy"
            solved={stats.easySolved}
            total={stats.easyTotal}
            color="bg-gradient-to-r from-green-500 to-green-600"
            delay={0.3}
          />
          <ProgressBar
            label="Medium"
            solved={stats.mediumSolved}
            total={stats.mediumTotal}
            color="bg-gradient-to-r from-orange-500 to-orange-600"
            delay={0.4}
          />
          <ProgressBar
            label="Hard"
            solved={stats.hardSolved}
            total={stats.hardTotal}
            color="bg-gradient-to-r from-red-500 to-red-600"
            delay={0.5}
          />
        </div>

        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-orange-400 to-orange-600 opacity-50 rounded-t-2xl" />
      </div>
    </motion.div>
  );
}
