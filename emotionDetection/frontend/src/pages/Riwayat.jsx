import { useMemo, useState } from 'react'
import Navbar from '../components/layout/Navbar'
import StatCard from '../components/history/StatCard'
import FilterBar from '../components/history/FilterBar'
import HistoryTable from '../components/history/HistoryTable'
import Pagination from '../components/history/Pagination'
import { useAuth } from '../context/AuthContext'

// TODO: ganti dengan data dari GET /history
const MOCK_DATA = [
  { id: 1, teks: 'Hari ini sangat menyenangkan sekali bisa bertemu teman-teman lama setelah sekian lama...', label: 'Happy', skor: 87, feedback: 'benar', koreksi: null, tanggal: '08 Mei 2026, 10.24' },
  { id: 2, teks: 'Aku tidak suka dengan kejadian tadi, sangat menyebalkan dan bikin kesal banget', label: 'Anger', skor: 73, feedback: 'salah', koreksi: 'Fear', tanggal: '07 Mei 2026, 15.47' },
  { id: 3, teks: 'Kangen banget sama orang tua di kampung, sudah lama sekali tidak pulang ke rumah', label: 'Sadness', skor: 81, feedback: 'benar', koreksi: null, tanggal: '07 Mei 2026, 09.15' },
  { id: 4, teks: 'Deg-degan banget besok mau ujian skripsi, semoga lancar dan hasilnya memuaskan', label: 'Fear', skor: 65, feedback: 'benar', koreksi: null, tanggal: '06 Mei 2026, 21.03' },
  { id: 5, teks: 'Sayang banget sama dia, rasanya ingin selalu ada di sisi dia setiap saat', label: 'Love', skor: 92, feedback: 'salah', koreksi: 'Happy', tanggal: '05 Mei 2026, 18.30' },
  { id: 6, teks: 'Alhamdulillah akhirnya diterima kerja di perusahaan impian, nggak nyangka sama sekali', label: 'Happy', skor: 95, feedback: 'benar', koreksi: null, tanggal: '04 Mei 2026, 08.56' },
  { id: 7, teks: 'Nangis sendirian malam ini, rasanya lelah sekali menanggung semua ini sendiri', label: 'Sadness', skor: 89, feedback: 'benar', koreksi: null, tanggal: '03 Mei 2026, 23.41' },
  { id: 8, teks: 'Seneng banget hari ini dapat kabar baik dari kampus soal beasiswa', label: 'Happy', skor: 88, feedback: 'benar', koreksi: null, tanggal: '02 Mei 2026, 14.10' },
  { id: 9, teks: 'Takut banget ngeliat berita kecelakaan di jalan tadi pagi, ngeri', label: 'Fear', skor: 76, feedback: null, koreksi: null, tanggal: '01 Mei 2026, 07.55' },
  { id: 10, teks: 'Kesel banget sama macet parah tadi sore, buang-buang waktu aja', label: 'Anger', skor: 82, feedback: 'benar', koreksi: null, tanggal: '30 Apr 2026, 17.22' },
  { id: 11, teks: 'Rindu masa-masa kuliah dulu bareng teman-teman, kangen suasananya', label: 'Sadness', skor: 79, feedback: null, koreksi: null, tanggal: '29 Apr 2026, 20.05' },
  { id: 12, teks: 'Sayang sekali sama keluarga, semoga selalu diberi kesehatan semua', label: 'Love', skor: 90, feedback: 'benar', koreksi: null, tanggal: '28 Apr 2026, 12.40' },
  { id: 13, teks: 'Bahagia rasanya liat progress skripsi udah mulai kelihatan hasilnya', label: 'Happy', skor: 85, feedback: 'salah', koreksi: 'Love', tanggal: '27 Apr 2026, 09.30' },
  { id: 14, teks: 'Deg-degan nunggu pengumuman hasil sidang, semoga semuanya lancar', label: 'Fear', skor: 71, feedback: null, koreksi: null, tanggal: '26 Apr 2026, 16.18' },
  { id: 15, teks: 'Marah banget diperlakukan gak adil sama orang yang gak bertanggung jawab', label: 'Anger', skor: 84, feedback: 'benar', koreksi: null, tanggal: '25 Apr 2026, 11.05' },
]

const PAGE_SIZE = 8

export default function Riwayat() {
  const { user } = useAuth()
  const [emotionFilter, setEmotionFilter] = useState('')
  const [feedbackFilter, setFeedbackFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    return MOCK_DATA.filter((row) => {
      if (emotionFilter && row.label !== emotionFilter) return false
      if (feedbackFilter && row.feedback !== feedbackFilter) return false
      if (search && !row.teks.toLowerCase().includes(search.toLowerCase())) return false
      return true
    })
  }, [emotionFilter, feedbackFilter, search])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const totalDeteksi = MOCK_DATA.length
  const totalBenar = MOCK_DATA.filter((r) => r.feedback === 'benar').length
  const totalSalah = MOCK_DATA.filter((r) => r.feedback === 'salah').length

  return (
    <div className="min-h-screen bg-bg font-sans">
      <Navbar showLinks activePage="riwayat" userName={user?.nama_lengkap ?? 'Pengguna'} />

      <div className="mx-auto max-w-240 px-6 pb-16 pt-8">
        <div className="mb-6">
          <h1 className="mb-1 font-serif-display text-[28px] tracking-tight text-text-primary">
            Riwayat Deteksi
          </h1>
          <p className="text-sm text-text-secondary">
            Seluruh riwayat deteksi emosi yang pernah kamu lakukan
          </p>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-3">
          <StatCard label="Total deteksi" value={totalDeteksi} color="blue" />
          <StatCard label="Prediksi benar" value={totalBenar} color="green" />
          <StatCard label="Prediksi salah" value={totalSalah} color="red" />
        </div>

        <FilterBar
          emotionFilter={emotionFilter}
          onEmotionChange={(v) => { setEmotionFilter(v); setPage(1) }}
          feedbackFilter={feedbackFilter}
          onFeedbackChange={(v) => { setFeedbackFilter(v); setPage(1) }}
          search={search}
          onSearchChange={(v) => { setSearch(v); setPage(1) }}
        />

        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <HistoryTable data={paginated} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={filtered.length}
            pageSize={PAGE_SIZE}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  )
}