const STEPS = ['Input teks', 'Hasil deteksi', 'Feedback']

export default function StepTracker({ current }) {
  return (
    <div className="mb-7 flex items-center">
      {STEPS.map((label, i) => {
        const stepNum = i + 1
        const status = stepNum < current ? 'done' : stepNum === current ? 'active' : 'idle'
        return (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className="flex items-center gap-2">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                  status === 'active'
                    ? 'border-brand-blue bg-brand-blue text-white'
                    : status === 'done'
                      ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                      : 'border-border bg-white text-text-muted'
                }`}
              >
                {stepNum}
              </div>
              <span
                className={`whitespace-nowrap text-[13px] font-medium ${
                  status === 'active' ? 'text-brand-blue' : status === 'done' ? 'text-text-secondary' : 'text-text-muted'
                }`}
              >
                {label}
              </span>
            </div>
            {stepNum < STEPS.length && (
              <div className={`mx-3 h-px min-w-10 flex-1 ${stepNum < current ? 'bg-brand-blue-border' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}