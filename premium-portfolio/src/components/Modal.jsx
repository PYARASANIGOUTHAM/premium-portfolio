import { motion } from 'framer-motion';

export default function Modal({ open, onClose, title, children, footer }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <motion.div
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.97 }}
        className="w-full max-w-2xl rounded-3xl border border-white/20 bg-slate-900/95 p-6 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <button className="rounded-full border border-white/20 px-3 py-1 text-sm text-gray-300 hover:bg-white/10" onClick={onClose}>Close</button>
        </div>
        <div className="space-y-4">{children}</div>
        {footer && <div className="mt-5 flex justify-end">{footer}</div>}
      </motion.div>
    </div>
  );
}
