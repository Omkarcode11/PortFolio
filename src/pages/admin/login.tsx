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
      <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[var(--bg-primary)] px-4">
        {/* Ambient Background */}
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-brand-cyan/10 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-violet/10 rounded-full blur-[120px] -z-10" />

        <div className="w-full max-w-md relative z-10">
          <div className="card shadow-2xl bg-[var(--bg-card)]/80 backdrop-blur-md border-[var(--border-color)] p-8 md:p-10">
            <div className="text-center mb-10">
              <div className="mb-6 flex justify-center">
                 <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-cyan to-brand-blue flex items-center justify-center shadow-lg shadow-brand-blue/20">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                 </div>
              </div>
              <h1 className="text-3xl font-extrabold mb-2 tracking-tight">Admin Portal</h1>
              <p className="text-[var(--text-secondary)]">Sign in to manage your portfolio</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-[var(--text-primary)]">Username</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-input focus:border-brand-blue focus:shadow-brand-blue/10"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold ml-1 text-[var(--text-primary)]">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input focus:border-brand-violet focus:shadow-brand-violet/10"
                  required
                />
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full justify-center py-4 bg-gradient-to-r from-brand-blue to-brand-violet hover:shadow-brand-blue/20 border-none transition-all"
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-8 text-center pt-6 border-t border-[var(--border-color)]">
              <button 
                onClick={() => router.push('/')}
                className="text-sm text-[var(--text-secondary)] hover:text-brand-blue transition-colors flex items-center justify-center gap-2 mx-auto group"
              >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
