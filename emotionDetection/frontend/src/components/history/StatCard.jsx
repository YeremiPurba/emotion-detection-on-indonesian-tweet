const COLORS = {
  blue: 'text-brand-blue',
  green: 'text-[#057A55]',
  red: 'text-[#E02424]',
}

export default function StatCard({ label, value, color = 'blue' }) {
  return (
    <div className="rounded-2xl border border-border bg-white px-4.5 py-4">
      <div className="mb-1.5 text-xs text-text-muted">{label}</div>
      <div className={`text-[26px] font-semibold tracking-tight ${COLORS[color]}`}>{value}</div>
    </div>
  )
}