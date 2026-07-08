import { Smile } from 'lucide-react'
import SectionLabel from './SectionLabel'

export default function PredictionResult({
  label,
  score,
  tweetText,
}) {
  return (
    <div className="mb-4 rounded-2xl border border-border bg-white p-6">
      <SectionLabel step={2} />

      <div className="mb-3.5 text-base font-semibold text-text-primary">
        Hasil deteksi emosi
      </div>

      <div className="flex items-center gap-5 rounded-[10px] border border-brand-blue-border bg-brand-blue-light p-4">
        <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-xl bg-brand-blue">
          <Smile
            size={28}
            className="text-white"
          />
        </div>

        <div className="flex-1">
          <div className="mb-0.5 text-xs font-medium text-brand-blue">
            Label emosi terdeteksi
          </div>

          <div
            className="font-serif-display text-[28px] tracking-tight text-text-primary"
            style={{ textTransform: 'capitalize' }}
          >
            {label}
          </div>
        </div>

        <div className="text-right">
          <div className="mb-0.5 text-[11px] text-text-secondary">
            Confidence score
          </div>

          <div className="text-[28px] font-semibold text-brand-blue">
            {score}%
          </div>
        </div>
      </div>

      <div className="mt-3.5 rounded-[10px] border-l-[3px] border-brand-blue-border bg-bg px-3.5 py-3 text-[13px] italic leading-relaxed text-text-secondary">
        "{tweetText}"
      </div>
    </div>
  )
}