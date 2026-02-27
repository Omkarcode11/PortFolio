"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal = ({ isOpen, onClose }: LoginModalProps) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      username: credentials.username,
      password: credentials.password,
    });

    if (result?.error) {
      setError("Invalid credentials");
      setLoading(false);
    } else {
      window.location.href = "/admin/dashboard";
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="modal-overlay animate-in fade-in duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="modal-content animate-in zoom-in-95 slide-in-from-bottom-4 duration-300 ease-out"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-(--text-secondary) hover:text-brand-blue transition-colors z-20"
          aria-label="Close"
        >
          ×
        </button>

        <div className="text-center mb-8 pt-4">
          <h2 className="text-3xl font-bold mb-2 bg-linear-to-r from-brand-cyan to-brand-violet bg-clip-text text-transparent">
            Admin Access
          </h2>
          <p className="text-(--text-secondary) text-sm">
            Enter your credentials to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
          <div>
            <label className="block text-sm font-semibold mb-1 ml-1 text-(--text-primary)">
              Username
            </label>
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
            <label className="block text-sm font-semibold mb-1 ml-1 text-(--text-primary)">
              Password
            </label>
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
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center font-medium animate-in slide-in-from-top-2 duration-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full justify-center bg-linear-to-r from-brand-blue to-brand-violet border-none shadow-lg shadow-brand-blue/20"
          >
            {loading ? "Verifying..." : "Authenticate"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-(--border-color) text-center">
          <p className="text-xs text-(--text-secondary)">
            Secure Gateway • Portfolio Admin
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
