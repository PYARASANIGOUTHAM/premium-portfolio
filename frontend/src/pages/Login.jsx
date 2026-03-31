import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { loginAdmin, setToken, isAuthenticated } from '../utils/auth';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || '/';
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('password');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  const submit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await loginAdmin({ email, password });
      const token = data?.token;

      if (!token) {
        throw new Error('JWT token not returned from server');
      }

      setToken(token);
      toast.success('Login successful');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Invalid credentials. Use admin@example.com/password';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-200 px-4 py-12 dark:from-apple-gray-900 dark:via-apple-gray-900 dark:to-apple-gray-950">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-md rounded-2xl border border-white/20 bg-white/80 p-8 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-black/50"
      >
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Admin Login</h1>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-300">Enter credentials to manage contact messages.</p>

        <form onSubmit={submit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-accent dark:border-gray-700 dark:bg-apple-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-300">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none transition focus:border-accent dark:border-gray-700 dark:bg-apple-gray-800 dark:text-white"
            />
          </div>

          {error && <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-500/40 dark:bg-red-500/10 dark:text-red-200">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-xl bg-accent px-4 py-2 font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">Use <span className="font-semibold">admin@example.com</span> / <span className="font-semibold">password</span></p>
      </motion.div>
    </div>
  );
}
