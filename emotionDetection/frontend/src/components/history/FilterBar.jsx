export default function FilterBar({ emotionFilter, onEmotionChange, feedbackFilter, onFeedbackChange, search, onSearchChange }) {
  return (
    <div className="mb-4 flex items-center gap-2.5">
      <select
        value={emotionFilter}
        onChange={(e) => onEmotionChange(e.target.value)}
        className="h-9 cursor-pointer rounded-[10px] border border-border bg-white px-3 text-[13px] text-text-primary outline-none"
      >
        <option value="">Semua emosi</option>
        <option value="Anger">Anger</option>
        <option value="Happy">Happy</option>
        <option value="Sadness">Sadness</option>
        <option value="Fear">Fear</option>
        <option value="Love">Love</option>
      </select>

      <select
        value={feedbackFilter}
        onChange={(e) => onFeedbackChange(e.target.value)}
        className="h-9 cursor-pointer rounded-[10px] border border-border bg-white px-3 text-[13px] text-text-primary outline-none"
      >
        <option value="">Semua feedback</option>
        <option value="benar">Benar</option>
        <option value="salah">Salah</option>
        <option value="belum">Belum ada</option>
      </select>

      <input
        type="text"
        placeholder="Cari teks tweet..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="h-9 flex-1 rounded-[10px] border border-border px-3 text-[13px] text-text-primary outline-none transition-colors focus:border-brand-blue"
      />
    </div>
  )
}