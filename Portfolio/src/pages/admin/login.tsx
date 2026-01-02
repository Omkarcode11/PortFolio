import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push('/admin/dashboard');
    }
  }, [session, router]);

  if (session) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    if (result && !result.error) {
      router.push('/admin/dashboard');
    } else {
      setError('Invalid username or password');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Portfolio</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
        <div className="w-full max-w-md">
          <div className="card shadow-2xl border-primary-500/10 p-8 md:p-10">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-extrabold mb-2">Admin Portal</h1>
              <p className="text-[var(--text-secondary)]">Sign in to manage your portfolio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Username</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full justify-center py-4 bg-primary-600 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={() => router.push('/')}
                className="text-sm text-[var(--text-secondary)] hover:text-primary-500 transition-colors"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
