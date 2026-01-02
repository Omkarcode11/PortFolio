'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { signIn } from 'next-auth/react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await signIn('credentials', {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (result?.error) {
      setError('Invalid credentials');
      setLoading(false);
    } else {
      window.location.href = '/admin/dashboard';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-[var(--text-secondary)] hover:text-brand-blue transition-colors z-20"
              aria-label="Close"
            >
              ×
            </button>

            <div className="text-center mb-8 pt-4">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-brand-cyan to-brand-violet bg-clip-text text-transparent">Admin Access</h2>
              <p className="text-[var(--text-secondary)] text-sm">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div>
                <label className="block text-sm font-semibold mb-1 ml-1 text-[var(--text-primary)]">Username</label>
                <input
                  type="text"
                  placeholder="admin"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="form-input focus:border-brand-blue focus:shadow-brand-blue/10"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1 ml-1 text-[var(--text-primary)]">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="form-input focus:border-brand-violet focus:shadow-brand-violet/10"
                  required
                />
              </div>

              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full justify-center bg-gradient-to-r from-brand-blue to-brand-violet border-none shadow-lg shadow-brand-blue/20"
              >
                {loading ? 'Verifying...' : 'Authenticate'}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-[var(--border-color)] text-center">
              <p className="text-xs text-[var(--text-secondary)]">
                Secure Gateway • Portfolio Admin
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
