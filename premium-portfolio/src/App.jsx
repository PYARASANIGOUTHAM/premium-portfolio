import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import { clearToken } from './utils/auth';

function AdminShell({ sidebarOpen, onToggleSidebar, onLogout, onToggleTheme, isDark }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar collapsed={!sidebarOpen} onLogout={onLogout} />

      <div className="flex flex-1 flex-col transition-all duration-300" style={{ marginLeft: sidebarOpen ? 250 : 64 }}>
        <Navbar
          adminName="Admin"
          onLogout={onLogout}
          onToggleTheme={onToggleTheme}
          isDark={isDark}
          onMenuToggle={onToggleSidebar}
        />

        <main className="overflow-y-auto px-4 py-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const stored = localStorage.getItem('darkMode');
      return stored === null ? true : stored === 'true';
    } catch {
      return true;
    }
  });
  const navigate = useNavigate();

  const handleLogout = () => {
    clearToken();
    navigate('/login');
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add('dark');
    else root.classList.remove('dark');

    try {
      localStorage.setItem('darkMode', darkMode.toString());
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-apple-gray-50 dark:bg-apple-gray-950">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route element={<AdminShell sidebarOpen={sidebarOpen} onToggleSidebar={() => setSidebarOpen((prev) => !prev)} onLogout={handleLogout} onToggleTheme={toggleTheme} isDark={darkMode} />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;

