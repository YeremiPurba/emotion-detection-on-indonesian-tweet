import { Check, X } from 'lucide-react'
import EmotionBadge from './EmotionBadge'

export default function HistoryTable({ data }) {
  return (
    <table className="w-full table-fixed border-collapse">
      <thead>
        <tr className="border-b border-border bg-bg">
          <th className="w-[40%] px-3.5 py-2.75 text-left text-xs font-semibold tracking-wide text-text-muted">
            Teks tweet
          </th>

          <th className="w-[13%] px-3.5 py-2.75 text-left text-xs font-semibold tracking-wide text-text-muted">
            Label
          </th>

          <th className="w-[10%] px-3.5 py-2.75 text-left text-xs font-semibold tracking-wide text-text-muted">
            Skor
          </th>

          <th className="w-[20%] px-3.5 py-2.75 text-left text-xs font-semibold tracking-wide text-text-muted">
            Feedback
          </th>

          <th className="w-[17%] px-3.5 py-2.75 text-left text-xs font-semibold tracking-wide text-text-muted">
            Tanggal
          </th>
        </tr>
      </thead>

      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan={5}
              className="py-8 text-center text-sm text-text-muted"
            >
              Belum ada riwayat deteksi.
            </td>
          </tr>
        ) : (
          data.map((row) => (
            <tr
              key={row.id}
              className="border-t border-border hover:bg-[#FAFAFA]"
            >
              <td className="px-3.5 py-3.25">
                <div
                  className="truncate text-[13.5px] text-text-primary"
                  title={row.teks}
                >
                  {row.teks}
                </div>
              </td>

              <td className="px-3.5 py-3.25">
                <EmotionBadge label={row.label} />
              </td>

              <td className="px-3.5 py-3.25 text-[13.5px] tabular-nums text-text-secondary">
                {row.skor}%
              </td>

              <td className="px-3.5 py-3.25">
                {row.feedback === 'benar' ? (
                  <div className="inline-flex items-center gap-1 text-xs font-medium text-[#057A55]">
                    <Check size={13} strokeWidth={2.5} />
                    Benar
                  </div>
                ) : row.feedback === 'salah' ? (
                  <div>
                    <div className="inline-flex items-center gap-1 text-xs font-medium text-[#E02424]">
                      <X size={13} strokeWidth={2.5} />
                      Salah
                    </div>

                    {row.koreksi && (
                      <div className="mt-0.5 text-[11.5px] text-text-secondary">
                        Koreksi: {row.koreksi}
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="text-xs text-text-muted">
                    Belum ada
                  </span>
                )}
              </td>

              <td className="px-3.5 py-3.25 text-xs text-text-muted">
                {row.tanggal}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}