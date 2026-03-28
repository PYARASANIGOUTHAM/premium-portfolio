import { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import PrivateRoute from './components/PrivateRoute';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Messages from './pages/Messages';
import { isAuthenticated, clearToken } from './utils/auth';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
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
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-apple-gray-50 dark:bg-apple-gray-950">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex h-screen overflow-hidden">
        <Sidebar collapsed={!sidebarOpen} onLogout={handleLogout} />

        <div className="flex flex-1 flex-col transition-all duration-300" style={{ marginLeft: sidebarOpen ? 250 : 64 }}>
          <Navbar
            adminName="Admin"
            onLogout={handleLogout}
            onToggleTheme={toggleTheme}
            isDark={darkMode}
            onMenuToggle={() => setSidebarOpen((prev) => !prev)}
          />

          <main className="overflow-y-auto px-4 py-6">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/messages" element={<Messages />} />
                </Route>
                <Route path="*" element={<Navigate to={isAuthenticated() ? '/' : '/login'} replace />} />
              </Routes>
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;

