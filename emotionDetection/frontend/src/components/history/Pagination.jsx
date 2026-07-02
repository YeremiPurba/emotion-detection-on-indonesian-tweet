export default function Pagination({ currentPage, totalPages, totalItems, pageSize, onPageChange }) {
  const start = (currentPage - 1) * pageSize + 1
  const end = Math.min(currentPage * pageSize, totalItems)

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3">
      <span className="text-[13px] text-text-muted">
        Menampilkan {start}–{end} dari {totalItems} data
      </span>
      <div className="flex gap-1">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-[13px] text-text-secondary transition-colors hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          ←
        </button>
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg border text-[13px] transition-colors ${
              p === currentPage
                ? 'border-brand-blue bg-brand-blue text-white'
                : 'border-border text-text-secondary hover:border-brand-blue hover:text-brand-blue'
            }`}
          >
            {p}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-[13px] text-text-secondary transition-colors hover:border-brand-blue hover:text-brand-blue disabled:cursor-not-allowed disabled:opacity-35"
        >
          →
        </button>
      </div>
    </div>
  )
}