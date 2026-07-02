const STYLES = {
  Anger: 'bg-[#FDF2F2] text-[#9B1C1C]',
  Happy: 'bg-[#FDFDEA] text-[#723B13]',
  Sadness: 'bg-brand-blue-light text-[#1e40af]',
  Fear: 'bg-[#F3F4F6] text-[#374151]',
  Love: 'bg-[#FDF2F8] text-[#99154B]',
}

export default function EmotionBadge({ label }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.75 text-xs font-medium ${STYLES[label] ?? STYLES.Fear}`}
    >
      {label}
    </span>
  )
}