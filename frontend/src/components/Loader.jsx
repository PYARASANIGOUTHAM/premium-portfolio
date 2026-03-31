export default function Loader({ text = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="animate-spin rounded-full border-4 border-white/25 border-t-accent h-10 w-10" />
      <p className="ml-3 text-sm text-slate-300">{text}</p>
    </div>
  );
}
