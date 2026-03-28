import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTrash } from 'react-icons/fa';

export default function MessageTable({ messages, onDelete }) {
  const [query, setQuery] = useState('');
  const [sortNewestFirst, setSortNewestFirst] = useState(true);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return messages
      .filter((m) => m.name.toLowerCase().includes(lower) || m.email.toLowerCase().includes(lower) || m.message.toLowerCase().includes(lower))
      .sort((a, b) => {
        const diff = new Date(b.createdAt) - new Date(a.createdAt);
        return sortNewestFirst ? diff : -diff;
      });
  }, [messages, query, sortNewestFirst]);

  return (
    <div className="glass-card p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="relative max-w-xs">
          <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search messages..."
            className="w-full rounded-lg border border-gray-200 bg-white px-10 py-2 text-sm outline-none placeholder:text-gray-400 dark:border-gray-700 dark:bg-apple-gray-900 dark:text-gray-100"
          />
        </div>
        <button
          onClick={() => setSortNewestFirst((prev) => !prev)}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm text-gray-700 transition hover:border-blue-300 dark:border-gray-700 dark:text-gray-100"
        >
          Sort: {sortNewestFirst ? 'Latest first' : 'Oldest first'}
        </button>
      </div>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-blue-50 text-gray-700 dark:bg-gray-800 dark:text-gray-200">
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Message</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-300">No messages found.</td>
                </tr>
              ) : filtered.map((message) => (
                <motion.tr
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="border-b border-gray-200 dark:border-gray-700"
                >
                  <td className="px-3 py-2 text-gray-800 dark:text-gray-100">{message.name}</td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-300">{message.email}</td>
                  <td className="px-3 py-2 text-gray-600 dark:text-gray-300 max-w-[250px] truncate">{message.message}</td>
                  <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{new Date(message.createdAt).toLocaleDateString()}</td>
                  <td className="px-3 py-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-md bg-red-500 px-2 py-1 text-white transition hover:bg-red-600"
                      onClick={() => onDelete(message.id)}
                    >
                      <FaTrash className="h-3 w-3" /> Delete
                    </button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      <div className="mt-4 text-right text-sm text-gray-500 dark:text-gray-400">Showing {filtered.length} record(s) on this page before search filter</div>
    </div>
  );
}
