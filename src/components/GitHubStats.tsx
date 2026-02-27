import { useEffect, useState } from "react";
import {
  fetchGitHubStats,
  GitHubStats as GitHubStatsType,
  getCachedData,
  setCachedData,
} from "../lib/statsApi";

interface GitHubStatsProps {
  username: string;
  token?: string; // Optional: GitHub Personal Access Token for higher rate limits
}

const LoadingSkeleton = () => (
  <div className="p-6 rounded-2xl bg-(--bg-secondary)/30 border border-(--border-color)">
    <div className="flex items-center gap-3 mb-6">
      <div className="w-10 h-10 bg-(--bg-card) rounded-xl animate-pulse" />
      <div className="flex-1">
        <div className="h-4 bg-(--bg-card) rounded w-24 mb-2 animate-pulse" />
        <div className="h-3 bg-(--bg-card) rounded w-32 animate-pulse" />
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 mb-6">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-4 bg-(--bg-card) rounded-xl animate-pulse h-20"
        />
      ))}
    </div>
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-16 bg-(--bg-card) rounded-xl animate-pulse" />
      ))}
    </div>
  </div>
);

const ErrorState = ({ onRetry }: { onRetry: () => void }) => (
  <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 animate-in fade-in zoom-in duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
        <span className="text-red-500 text-xl">⚠️</span>
      </div>
      <div>
        <h4 className="font-bold text-red-500">Failed to load GitHub stats</h4>
        <p className="text-sm text-(--text-secondary)">Unable to fetch data</p>
      </div>
    </div>
    <button
      onClick={onRetry}
      className="w-full px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg text-sm font-semibold transition-colors"
    >
      Retry
    </button>
  </div>
);

const AnimatedCounter = ({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) => {
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

const StatCard = ({
  icon,
  label,
  value,
  gradient,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  gradient: string;
}) => (
  <div className="relative p-4 rounded-xl bg-(--bg-card)/50 border border-(--border-color) hover:border-purple-500/30 transition-all group animate-in fade-in zoom-in duration-500">
    <div className="flex items-center gap-2 mb-2">
      <div className={`text-lg ${gradient}`}>{icon}</div>
      <span className="text-xs text-(--text-secondary) font-medium uppercase tracking-wide">
        {label}
      </span>
    </div>
    <div className={`text-2xl font-black ${gradient}`}>
      <AnimatedCounter value={value} duration={1.5} />
    </div>
  </div>
);

const RepoCard = ({ repo, index }: { repo: any; index: number }) => {
  const languageColors: { [key: string]: string } = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    Python: "bg-blue-600",
    Java: "bg-red-600",
    "C++": "bg-pink-600",
    Go: "bg-cyan-500",
    Rust: "bg-orange-600",
    Ruby: "bg-red-500",
    PHP: "bg-purple-600",
  };

  const languageColor = languageColors[repo.language] || "bg-gray-500";

  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-xl bg-(--bg-card)/30 border border-(--border-color) hover:border-purple-500/40 hover:bg-(--bg-card)/50 transition-all group animate-in fade-in slide-in-from-left-4 duration-500"
      style={{ animationDelay: `${0.5 + index * 0.1}s` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h4 className="font-bold text-sm text-(--text-primary) group-hover:text-purple-400 transition-colors line-clamp-1">
          {repo.name}
        </h4>
        <svg
          className="w-3 h-3 text-(--text-secondary) group-hover:text-purple-400 transition-colors shrink-0 mt-0.5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </div>

      <p className="text-xs text-(--text-secondary) mb-3 line-clamp-2 leading-relaxed">
        {repo.description}
      </p>

      <div className="flex items-center gap-4 text-xs text-(--text-secondary)">
        {repo.language && (
          <div className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${languageColor}`} />
            <span>{repo.language}</span>
          </div>
        )}
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-star text-yellow-500 text-[10px]"></i>
          <span>{repo.stars}</span>
        </div>
        <div className="flex items-center gap-1">
          <i className="fa-solid fa-code-fork text-[10px]"></i>
          <span>{repo.forks}</span>
        </div>
      </div>
    </a>
  );
};

export default function GitHubStats({ username, token }: GitHubStatsProps) {
  const [stats, setStats] = useState<GitHubStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = async () => {
    setLoading(true);
    setError(false);

    // Check cache first
    const cacheKey = `github_${username}`;
    const cachedStats = getCachedData<GitHubStatsType>(cacheKey);

    if (cachedStats) {
      setStats(cachedStats);
      setLoading(false);
      return;
    }

    // Fetch fresh data
    const freshStats = await fetchGitHubStats(username, token);

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
    <div className="relative group animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Card */}
      <div className="relative p-6 rounded-2xl bg-linear-to-br from-(--bg-secondary)/50 to-(--bg-secondary)/30 border border-(--border-color) hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/5">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center group-hover:scale-110 transition-transform">
            <i className="fa-brands fa-github text-purple-400 text-xl"></i>
          </div>
          <div>
            <h3 className="font-bold text-lg text-(--text-primary)">GitHub</h3>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 hover:underline transition-colors flex items-center gap-1"
            >
              @{username}
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <StatCard
            icon={<i className="fa-brands fa-github"></i>}
            label="Repositories"
            value={stats.totalRepos}
            gradient="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600"
          />
          <StatCard
            icon={<i className="fa-solid fa-star"></i>}
            label="Total Stars"
            value={stats.totalStars}
            gradient="text-transparent bg-clip-text bg-linear-to-r from-yellow-400 to-yellow-600"
          />
          <StatCard
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            }
            label="Followers"
            value={stats.followers}
            gradient="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-blue-600"
          />
          <StatCard
            icon={
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            }
            label="Contributions"
            value={stats.contributions}
            gradient="text-transparent bg-clip-text bg-linear-to-r from-green-400 to-green-600"
          />
        </div>

        {/* Top Repositories */}
        {stats.topRepos && stats.topRepos.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-(--text-primary) mb-3 flex items-center gap-2">
              <i className="fa-solid fa-star text-yellow-500 text-xs"></i>
              Top Repositories
            </h4>
            <div className="space-y-3">
              {stats.topRepos.map((repo, index) => (
                <RepoCard key={repo.name} repo={repo} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-purple-500 via-purple-400 to-purple-600 opacity-50 rounded-t-2xl" />
      </div>
    </div>
  );
}
