import { motion } from 'framer-motion';

export default function DeleteModal({ open, onClose, onConfirm, itemName = 'message' }) {
  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="w-full max-w-md rounded-2xl border border-white/15 bg-slate-900/95 p-6 shadow-2xl"
      >
        <h2 className="text-xl font-bold text-white">Delete {itemName}?</h2>
        <p className="mt-2 text-sm text-slate-300">Are you sure you want to delete this {itemName}? This action cannot be undone.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
