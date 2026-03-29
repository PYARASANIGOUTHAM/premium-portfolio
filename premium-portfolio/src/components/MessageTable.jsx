import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaEye, FaTrash } from 'react-icons/fa';
import Modal from './Modal';

export default function MessageTable({ messages, onDelete }) {
  const [query, setQuery] = useState('');
  const [sortNewestFirst, setSortNewestFirst] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    const lower = query.toLowerCase();
    return messages
      .filter((m) =>
        m.name.toLowerCase().includes(lower) ||
        m.email.toLowerCase().includes(lower) ||
        m.message.toLowerCase().includes(lower)
      )
      .sort((a, b) => {
        const diff = new Date(b.createdAt) - new Date(a.createdAt);
        return sortNewestFirst ? diff : -diff;
      });
  }, [messages, query, sortNewestFirst]);

  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pagedMessages = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <>
      <div className="glass-card p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative max-w-xs">
            <FaSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
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
                {pagedMessages.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500 dark:text-gray-300">No messages found.</td>
                  </tr>
                ) : (
                  pagedMessages.map((message) => (
                    <motion.tr
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="border-b border-gray-200 dark:border-gray-700 hover:-translate-y-0.5 hover:bg-white/10 transition-transform"
                    >
                      <td className="px-3 py-2 text-gray-800 dark:text-gray-100">{message.name}</td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-300">{message.email}</td>
                      <td className="px-3 py-2 text-gray-600 dark:text-gray-300 max-w-[260px] truncate">{message.message}</td>
                      <td className="px-3 py-2 text-gray-500 dark:text-gray-400">{new Date(message.createdAt).toLocaleDateString()}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button
                          onClick={() => setSelected(message)}
                          className="inline-flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2 py-1 text-xs font-semibold text-cyan-200 hover:bg-cyan-500/20"
                        >
                          <FaEye /> View
                        </button>
                        <button
                          onClick={() => onDelete(message.id)}
                          className="inline-flex items-center gap-2 rounded-lg bg-rose-500 px-2 py-1 text-xs font-semibold text-white transition hover:bg-rose-600"
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between text-sm text-gray-400">
          <span>{filtered.length} messages found</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage <= 1}
              className="rounded-lg border border-white/20 px-3 py-1 font-medium disabled:opacity-50"
            >
              Prev
            </button>
            <span>{currentPage} / {pages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(pages, prev + 1))}
              disabled={currentPage >= pages}
              className="rounded-lg border border-white/20 px-3 py-1 font-medium disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <Modal open={!!selected} title="Message preview" onClose={() => setSelected(null)} footer={
        <button
          onClick={() => setSelected(null)}
          className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
        >
          Close
        </button>
      }>
        {selected && (
          <div>
            <p className="text-sm text-slate-300"><strong>Name:</strong> {selected.name}</p>
            <p className="text-sm text-slate-300"><strong>Email:</strong> {selected.email}</p>
            <p className="mt-2 text-sm text-slate-200">{selected.message}</p>
            <p className="mt-4 text-xs text-slate-400">Received: {new Date(selected.createdAt).toLocaleString()}</p>
          </div>
        )}
      </Modal>
    </>
  );
}
