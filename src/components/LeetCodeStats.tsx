import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { fetchLeetCodeStats, LeetCodeStats as LeetCodeStatsType, getCachedData, setCachedData } from '../lib/statsApi';
import { SiLeetcode } from 'react-icons/si';
import { FaCheckCircle, FaFire, FaTrophy, FaChartLine } from 'react-icons/fa';

interface LeetCodeStatsProps {
  username: string;
}

interface DayData {
  date: Date;
  count: number;
  timestamp: string;
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

const AnimatedCounter = ({ value, duration = 2 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (value === 0) {
      setCount(0);
      return;
    }

    let start = 0;
    const end = value;
    const increment = Math.ceil(end / 50);
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

const calculateStreaks = (days: DayData[]): { current: number; longest: number } => {
  if (!days || days.length === 0) {
    return { current: 0, longest: 0 };
  }

  // Sort by date (newest first - today is first)
  const sortedDays = [...days].sort((a, b) => b.date.getTime() - a.date.getTime());

  // Calculate current streak (from today backwards, consecutive days with activity)
  let currentStreak = 0;
  for (let i = 0; i < sortedDays.length; i++) {
    if (sortedDays[i].count > 0) {
      currentStreak++;
    } else {
      // Stop at first day with no activity
      break;
    }
  }

  // Calculate longest streak (anywhere in the dataset)
  let longestStreak = 0;
  let tempStreak = 0;
  
  // Sort by date (oldest first) for longest streak calculation
  const sortedOldestFirst = [...days].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  for (let i = 0; i < sortedOldestFirst.length; i++) {
    if (sortedOldestFirst[i].count > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return { current: currentStreak, longest: longestStreak };
};

const processSubmissionCalendar = (calendar: { [key: string]: number } | undefined, days: number = 90): DayData[] => {
  if (!calendar || Object.keys(calendar).length === 0) {
    console.log('No submission calendar data available');
    return [];
  }

  // Create a map of timestamp -> count for O(1) lookup
  const calendarMap = new Map<number, number>();
  Object.entries(calendar).forEach(([key, value]) => {
    const timestamp = parseInt(key, 10);
    if (!isNaN(timestamp)) {
      calendarMap.set(timestamp, value);
    }
  });

  console.log('Processing calendar:', {
    totalEntries: calendarMap.size,
    sampleEntries: Array.from(calendarMap.entries()).slice(0, 5).map(([ts, count]) => ({
      timestamp: ts,
      date: new Date(ts * 1000).toISOString().split('T')[0],
      count
    }))
  });

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Use UTC to match API timestamps
  const result: DayData[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setUTCDate(date.getUTCDate() - i);
    date.setUTCHours(0, 0, 0, 0);
    
    // Get timestamp at start of day (UTC) - Unix timestamp in seconds
    const timestamp = Math.floor(date.getTime() / 1000);
    
    // Direct lookup in map
    const count = calendarMap.get(timestamp) || 0;

    result.push({ date, count, timestamp: timestamp.toString() });
  }

  const daysWithActivity = result.filter(d => d.count > 0).length;
  console.log('Processed result:', {
    totalDays: result.length,
    daysWithActivity,
    sampleResults: result.filter(d => d.count > 0).slice(0, 10).map(d => ({
      date: d.date.toISOString().split('T')[0],
      timestamp: d.timestamp,
      count: d.count
    }))
  });

  return result;
};

// ============================================
// CIRCULAR PROGRESS RING
// ============================================

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
  solved: number;
  total: number;
  icon: React.ReactNode;
  delay?: number;
}

const CircularProgress = ({ 
  percentage, 
  size = 80, 
  strokeWidth = 6, 
  color, 
  label, 
  solved, 
  total,
  icon,
  delay = 0
}: CircularProgressProps) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
      className="flex flex-col items-center"
    >
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-[var(--bg-card)] opacity-30"
          />
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            className={color}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, delay, ease: 'easeOut' }}
          />
        </svg>
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className={`text-lg ${color} mb-0.5`}>
            {icon}
          </div>
          <div className={`text-xs font-bold ${color}`}>
            {Math.round(percentage)}%
          </div>
        </div>
      </div>
      <div className="mt-3 text-center">
        <div className="text-sm font-semibold text-[var(--text-primary)]">
          {label}
        </div>
        <div className="text-xs text-[var(--text-secondary)] mt-0.5">
          {solved} / {total}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================
// CONTRIBUTION GRAPH
// ============================================

interface ContributionGraphProps {
  days: DayData[];
  maxCount: number;
}

const ContributionGraph = ({ days, maxCount }: ContributionGraphProps) => {
  const getIntensity = (count: number): string => {
    if (count === 0) return 'bg-[var(--bg-card)] opacity-20';
    const intensity = Math.min(count / maxCount, 1);
    if (intensity < 0.25) return 'bg-green-500/30';
    if (intensity < 0.5) return 'bg-green-500/50';
    if (intensity < 0.75) return 'bg-green-500/70';
    return 'bg-green-500';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Group days by weeks (7 days per week)
  const weeks: DayData[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="flex gap-1.5">
      {weeks.map((week, weekIndex) => (
        <div key={weekIndex} className="flex flex-col gap-1.5">
          {week.map((day, dayIndex) => {
            const isFirstWeek = weekIndex === 0;
            const dayName = day.date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0);
            const isFirstOfWeek = day.date.getDay() === 0;

            return (
              <motion.div
                key={day.timestamp}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                className="group relative"
              >
                <div
                  className={`w-3 h-3 rounded-sm ${getIntensity(day.count)} transition-all duration-200 hover:scale-125 hover:ring-2 hover:ring-green-500/50 cursor-pointer`}
                  title={`${formatDate(day.date)} • ${day.count} problem${day.count !== 1 ? 's' : ''} solved`}
                />
                {isFirstWeek && isFirstOfWeek && (
                  <div className="absolute -left-6 top-0.5 text-[10px] text-[var(--text-secondary)] opacity-60 whitespace-nowrap">
                    {dayName}
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

// ============================================
// LOADING & ERROR STATES
// ============================================

const LoadingSkeleton = () => (
  <div className="p-6 rounded-3xl bg-gradient-to-br from-[var(--bg-secondary)]/50 to-[var(--bg-secondary)]/30 border border-[var(--border-color)] backdrop-blur-sm">
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[var(--bg-card)]/50" />
        <div className="flex-1">
          <div className="h-5 bg-[var(--bg-card)]/50 rounded w-32 mb-2" />
          <div className="h-4 bg-[var(--bg-card)]/50 rounded w-24" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-[var(--bg-card)]/50 mb-3" />
            <div className="h-4 bg-[var(--bg-card)]/50 rounded w-16 mb-1" />
            <div className="h-3 bg-[var(--bg-card)]/50 rounded w-12" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="p-6 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-sm"
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

// ============================================
// MAIN COMPONENT
// ============================================

export default function LeetCodeStats({ username }: LeetCodeStatsProps) {
  const [stats, setStats] = useState<LeetCodeStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [viewMode, setViewMode] = useState<'stats' | 'consistency'>('stats');
  const [daysRange, setDaysRange] = useState<30 | 60 | 90>(90);

  const loadStats = async () => {
    setLoading(true);
    setError(false);

    const cacheKey = `leetcode_${username}`;
    const cachedStats = getCachedData<LeetCodeStatsType>(cacheKey);

    if (cachedStats) {
      setStats(cachedStats);
      setLoading(false);
      return;
    }

    const freshStats = await fetchLeetCodeStats(username);

    if (freshStats) {
      console.log('LeetCode stats loaded:', {
        totalSolved: freshStats.totalSolved,
        hasCalendar: !!freshStats.submissionCalendar,
        calendarKeys: freshStats.submissionCalendar ? Object.keys(freshStats.submissionCalendar).length : 0
      });
      setStats(freshStats);
      setCachedData(cacheKey, freshStats);
      setError(false);
    } else {
      console.error('Failed to load LeetCode stats');
      setError(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadStats();
  }, [username]);

  const processedDays = useMemo(() => {
    console.log('Stats submissionCalendar:', {
      exists: !!stats?.submissionCalendar,
      type: typeof stats?.submissionCalendar,
      keys: stats?.submissionCalendar ? Object.keys(stats.submissionCalendar).length : 0,
      sampleKeys: stats?.submissionCalendar ? Object.keys(stats.submissionCalendar).slice(0, 5) : []
    });
    const days = processSubmissionCalendar(stats?.submissionCalendar, daysRange);
    return days;
  }, [stats?.submissionCalendar, daysRange]);

  const streaks = useMemo(() => {
    const result = calculateStreaks(processedDays);
    console.log('Calculated streaks:', result);
    return result;
  }, [processedDays]);

  const maxCount = useMemo(() => {
    if (processedDays.length === 0) return 1;
    const counts = processedDays.map(d => d.count);
    return Math.max(...counts, 1);
  }, [processedDays]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error || !stats) {
    return <ErrorState onRetry={loadStats} />;
  }

  // Safety check - ensure we have valid stats
  if (!stats.totalSolved && !stats.easySolved && !stats.mediumSolved && !stats.hardSolved) {
    console.warn('LeetCode stats appear to be empty:', stats);
  }

  const easyPercentage = stats.easyTotal > 0 ? (stats.easySolved / stats.easyTotal) * 100 : 0;
  const mediumPercentage = stats.mediumTotal > 0 ? (stats.mediumSolved / stats.mediumTotal) * 100 : 0;
  const hardPercentage = stats.hardTotal > 0 ? (stats.hardSolved / stats.hardTotal) * 100 : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative group"
    >
      {/* Main Card */}
      <div className="relative p-6 rounded-3xl bg-gradient-to-br from-[var(--bg-secondary)]/60 via-[var(--bg-secondary)]/40 to-[var(--bg-secondary)]/30 border border-[var(--border-color)]/50 backdrop-blur-xl shadow-2xl hover:shadow-orange-500/10 transition-all duration-500">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-green-500/5 rounded-3xl pointer-events-none" />
        
        {/* Header */}
        <div className="relative z-10 flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 flex items-center justify-center border border-orange-500/20 shadow-lg"
            >
              <SiLeetcode className="text-orange-400" size={24} />
            </motion.div>
            <div>
              <h3 className="font-bold text-xl text-[var(--text-primary)] tracking-tight">LeetCode</h3>
              <a
                href={`https://leetcode.com/${username}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-orange-400 hover:text-orange-300 hover:underline transition-colors flex items-center gap-1.5 mt-0.5"
              >
                @{username}
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {stats.ranking > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <FaTrophy className="text-orange-400 text-xs" />
                <span className="text-orange-400 font-bold text-xs">
                  #{stats.ranking.toLocaleString()}
                </span>
              </div>
            </motion.div>
          )}
        </div>

        {/* View Toggle */}
        <div className="relative z-10 flex items-center gap-2 mb-6 p-1 rounded-xl bg-[var(--bg-card)]/30 border border-[var(--border-color)]/30">
          <button
            onClick={() => setViewMode('stats')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              viewMode === 'stats'
                ? 'bg-gradient-to-r from-orange-500/20 to-orange-600/10 text-orange-400 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FaChartLine size={14} />
              <span>Stats</span>
            </div>
          </button>
          <button
            onClick={() => setViewMode('consistency')}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              viewMode === 'consistency'
                ? 'bg-gradient-to-r from-green-500/20 to-green-600/10 text-green-400 shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <FaFire size={14} />
              <span>Consistency</span>
            </div>
          </button>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {viewMode === 'stats' ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 space-y-6"
            >
              {/* Main Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-card)]/50 to-[var(--bg-card)]/30 border border-[var(--border-color)]/30 backdrop-blur-sm hover:border-orange-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaCheckCircle className="text-orange-400" size={16} />
                    <span className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">Solved</span>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
                    <AnimatedCounter value={stats.totalSolved} />
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    of {stats.totalQuestions.toLocaleString()} total
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.15 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-card)]/50 to-[var(--bg-card)]/30 border border-[var(--border-color)]/30 backdrop-blur-sm hover:border-green-500/30 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaChartLine className="text-green-400" size={16} />
                    <span className="text-xs text-[var(--text-secondary)] font-medium uppercase tracking-wide">Acceptance</span>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600">
                    <AnimatedCounter value={stats.acceptanceRate} />%
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">
                    Success rate
                  </div>
                </motion.div>
              </div>

              {/* Circular Progress Rings */}
              <div className="grid grid-cols-3 gap-4">
                <CircularProgress
                  percentage={easyPercentage}
                  color="text-green-400"
                  label="Easy"
                  solved={stats.easySolved}
                  total={stats.easyTotal}
                  icon={<FaCheckCircle />}
                  delay={0.2}
                />
                <CircularProgress
                  percentage={mediumPercentage}
                  color="text-amber-400"
                  label="Medium"
                  solved={stats.mediumSolved}
                  total={stats.mediumTotal}
                  icon={<FaCheckCircle />}
                  delay={0.3}
                />
                <CircularProgress
                  percentage={hardPercentage}
                  color="text-red-400"
                  label="Hard"
                  solved={stats.hardSolved}
                  total={stats.hardTotal}
                  icon={<FaCheckCircle />}
                  delay={0.4}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="consistency"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 space-y-6"
            >
              {/* Streak Stats */}
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-card)]/50 to-[var(--bg-card)]/30 border border-[var(--border-color)]/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaFire className="text-orange-400" size={16} />
                    <span className="text-xs text-[var(--text-secondary)] font-medium uppercase">Current</span>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                    {streaks.current}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">days streak</div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 }}
                  className="p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-card)]/50 to-[var(--bg-card)]/30 border border-[var(--border-color)]/30 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <FaTrophy className="text-yellow-400" size={16} />
                    <span className="text-xs text-[var(--text-secondary)] font-medium uppercase">Longest</span>
                  </div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">
                    {streaks.longest}
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">days streak</div>
                </motion.div>
              </div>

              {/* Days Range Selector */}
              <div className="flex items-center gap-2">
                {[30, 60, 90].map((range) => (
                  <button
                    key={range}
                    onClick={() => setDaysRange(range as 30 | 60 | 90)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      daysRange === range
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-transparent'
                    }`}
                  >
                    {range}d
                  </button>
                ))}
              </div>

              {/* Contribution Graph */}
              <div className="p-4 rounded-2xl bg-[var(--bg-card)]/20 border border-[var(--border-color)]/20 backdrop-blur-sm">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--text-primary)]">Activity Heatmap</span>
                  {processedDays.length > 0 && (
                    <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                      <span>Less</span>
                      <div className="flex gap-1">
                        <div className="w-3 h-3 rounded-sm bg-[var(--bg-card)] opacity-20" />
                        <div className="w-3 h-3 rounded-sm bg-green-500/30" />
                        <div className="w-3 h-3 rounded-sm bg-green-500/50" />
                        <div className="w-3 h-3 rounded-sm bg-green-500/70" />
                        <div className="w-3 h-3 rounded-sm bg-green-500" />
                      </div>
                      <span>More</span>
                    </div>
                  )}
                </div>
                {processedDays.length > 0 ? (
                  <div className="overflow-x-auto pb-2">
                    <ContributionGraph days={processedDays} maxCount={maxCount} />
                  </div>
                ) : (
                  <div className="text-center py-8 text-sm text-[var(--text-secondary)]">
                    <p>No submission data available</p>
                    <p className="text-xs mt-1 opacity-60">Submission calendar data not found</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500/50 via-green-500/50 to-orange-500/50 rounded-b-3xl opacity-60" />
      </div>
    </motion.div>
  );
}
