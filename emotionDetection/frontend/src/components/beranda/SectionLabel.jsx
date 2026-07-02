export default function SectionLabel({ step }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
        Langkah {step}
      </span>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}