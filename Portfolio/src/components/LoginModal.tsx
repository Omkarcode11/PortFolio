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
          onClick={onClose}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="modal-content"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-2xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Close"
            >
              ×
            </button>

            <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="form-input"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="form-input"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="btn w-full justify-center disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-xs text-[var(--text-secondary)] text-center mt-6">
              Press <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs">Ctrl</kbd> +{' '}
              <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs">Alt</kbd> +{' '}
              <kbd className="px-2 py-1 bg-[var(--bg-tertiary)] rounded text-xs">A</kbd> to open this modal
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModal;
