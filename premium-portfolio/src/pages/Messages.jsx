import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import MessageTable from '../components/MessageTable';
import api from '../utils/api';

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(8);
  const [total, setTotal] = useState(0);

  const loadMessages = async (pageToLoad = 1) => {
    setLoading(true);
    setError('');
    try {
      const response = await api.get(`/admin/messages?page=${pageToLoad}&limit=${pageSize}`);
      const data = response.data || {};
      setMessages(data.items || []);
      setTotal(data.total || 0);
    } catch (err) {
      const message = err.response?.data?.message || 'Unable to fetch messages';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages(page);
  }, [page]);

  const sorted = useMemo(
    () => [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    [messages],
  );

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Delete this message?');
    if (!confirmed) return;

    setMessages((prev) => prev.filter((item) => item.id !== id));

    try {
      await api.delete(`/admin/messages/${id}`);
      setTotal((prev) => Math.max(0, prev - 1));
      toast.success('Message deleted successfully');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to delete message';
      toast.error(message);
    }
  };

  const exportCsv = () => {
    if (!messages.length) {
      toast('No records to export');
      return;
    }

    const headers = ['Name', 'Email', 'Message', 'Date'];
    const rows = messages.map((item) => [item.name, item.email, item.message, new Date(item.createdAt).toLocaleString()]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `messages_page_${page}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('Exported CSV');
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  return (
    <motion.main
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Messages</h2>
          <p className="text-sm text-gray-500 dark:text-gray-300">Total messages: {total}</p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-accent px-4 py-2 text-white transition hover:bg-blue-600"
          onClick={exportCsv}
        >
          Export CSV
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 dark:text-gray-300">Loading messages...</p>
      ) : error ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm text-red-600 dark:border-red-700 dark:bg-red-900/30 dark:text-red-200">{error}</p>
      ) : (
        <>
          <MessageTable messages={sorted} onDelete={handleDelete} />
          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            <span className="text-sm text-gray-600 dark:text-gray-300">{page} / {totalPages}</span>
            <button
              type="button"
              className="rounded-lg border border-gray-300 px-3 py-1 text-sm disabled:opacity-50"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        </>
      )}
    </motion.main>
  );
}
