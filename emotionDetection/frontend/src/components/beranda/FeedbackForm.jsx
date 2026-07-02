import { Check, X, Save } from 'lucide-react'
import SectionLabel from './SectionLabel'

const LABELS = ['Anger', 'Happy', 'Sadness', 'Fear', 'Love']

export default function FeedbackForm({
  detectedLabel,
  feedbackChoice,
  onChooseFeedback,
  koreksiLabel,
  onChooseKoreksi,
  onSave,
  saved,
}) {
  return (
    <div className="rounded-2xl border border-border bg-white p-6">
      <SectionLabel step={3} />
      <div className="mb-3.5 text-base font-semibold text-text-primary">Feedback prediksi</div>

      <p className="mb-3.5 text-sm text-text-primary">
        Apakah hasil deteksi <strong className="text-brand-blue">{detectedLabel}</strong> sudah benar?
      </p>

      <div className="mb-4 flex gap-2.5">
        <button
          disabled={saved}
          onClick={() => onChooseFeedback('benar')}
          className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border-[1.5px] text-[13.5px] font-medium transition-colors disabled:cursor-not-allowed ${
            feedbackChoice === 'benar'
              ? 'border-[#057A55] bg-[#F3FAF7] text-[#057A55]'
              : 'border-border bg-white text-text-secondary'
          }`}
        >
          <Check size={15} strokeWidth={2.5} />
          Benar
        </button>
        <button
          disabled={saved}
          onClick={() => onChooseFeedback('salah')}
          className={`flex h-10 flex-1 items-center justify-center gap-2 rounded-[10px] border-[1.5px] text-[13.5px] font-medium transition-colors disabled:cursor-not-allowed ${
            feedbackChoice === 'salah'
              ? 'border-[#E02424] bg-[#FDF2F2] text-[#E02424]'
              : 'border-border bg-white text-text-secondary'
          }`}
        >
          <X size={15} strokeWidth={2.5} />
          Salah
        </button>
      </div>

      {feedbackChoice === 'salah' && (
        <div className="mb-4 rounded-[10px] border border-border bg-bg p-4">
          <div className="mb-2.5 text-xs font-medium text-text-secondary">Pilih label yang benar:</div>
          <div className="flex flex-wrap gap-2">
            {LABELS.map((lbl) => (
              <button
                key={lbl}
                disabled={saved}
                onClick={() => onChooseKoreksi(lbl)}
                className={`rounded-full border-[1.5px] px-3.5 py-1.5 text-[13px] font-medium transition-colors disabled:cursor-not-allowed ${
                  koreksiLabel === lbl
                    ? 'border-brand-blue bg-brand-blue-light text-brand-blue'
                    : 'border-border bg-white text-text-secondary hover:border-brand-blue hover:text-brand-blue'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onSave}
        disabled={saved}
        className="flex h-10.5 w-full items-center justify-center gap-2 rounded-[10px] bg-text-primary text-sm font-medium text-white transition-colors hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Save size={15} />
        Simpan feedback
      </button>

      {saved && (
        <div className="mt-3 flex items-center gap-2 rounded-[10px] border border-[#84E1BC] bg-[#F3FAF7] px-4 py-3 text-[13px] text-[#057A55]">
          <Check size={16} strokeWidth={2.5} />
          Feedback berhasil disimpan. Terima kasih atas masukannya!
        </div>
      )}
    </div>
  )
}