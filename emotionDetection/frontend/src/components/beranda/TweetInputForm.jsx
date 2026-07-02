import { Search } from 'lucide-react'
import SectionLabel from './SectionLabel'

export default function TweetInputForm({ value, onChange, onSubmit, loading }) {
  return (
    <div className="mb-4 rounded-2xl border border-border bg-white p-6">
      <SectionLabel step={1} />
      <div className="mb-3.5 text-base font-semibold text-text-primary">Input teks tweet</div>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Masukkan teks tweet bahasa Indonesia di sini..."
        className="min-h-25 w-full resize-y rounded-[10px] border border-border px-3.5 py-3 text-sm leading-relaxed text-text-primary outline-none transition-colors focus:border-brand-blue"
      />

      <div className="mt-3 flex justify-end">
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex h-10 items-center gap-2 rounded-[10px] bg-brand-blue px-5 text-[13.5px] font-medium text-white transition-colors hover:bg-[#1648c8] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Search size={15} />
          {loading ? 'Mendeteksi...' : 'Deteksi emosi'}
        </button>
      </div>
    </div>
  )
}