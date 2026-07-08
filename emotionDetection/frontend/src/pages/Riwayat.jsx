import { useEffect, useMemo, useState } from 'react'

import Navbar from '../components/layout/Navbar'
import StatCard from '../components/history/StatCard'
import FilterBar from '../components/history/FilterBar'
import HistoryTable from '../components/history/HistoryTable'
import Pagination from '../components/history/Pagination'

import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const PAGE_SIZE = 8

export default function Riwayat() {
  const { user } = useAuth()

  const [history, setHistory] = useState([])

  const [emotionFilter, setEmotionFilter] = useState('')
  const [feedbackFilter, setFeedbackFilter] = useState('')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    fetchHistory()
  }, [])

  const fetchHistory = async () => {
    try {
      const response = await api.get('/history')

      const data = response.data.map((item) => ({
        id: item.id,
        teks: item.text,
        label:
          item.emotion.charAt(0).toUpperCase() +
          item.emotion.slice(1),

        skor: (item.confidence * 100).toFixed(2),

        feedback: item.feedback,
        koreksi: item.correction,

        tanggal: new Date(item.created_at).toLocaleString(
          'id-ID',
          {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }
        ),
      }))

      setHistory(data)
    } catch (error) {
      console.error(error)

      if (error.response) {
        alert(error.response.data.detail)
      } else {
        alert('Gagal mengambil riwayat.')
      }
    }
  }

  const filtered = useMemo(() => {
    return history.filter((row) => {
      if (emotionFilter && row.label !== emotionFilter) return false

      if (feedbackFilter && row.feedback !== feedbackFilter)
        return false

      if (
        search &&
        !row.teks.toLowerCase().includes(search.toLowerCase())
      )
        return false

      return true
    })
  }, [history, emotionFilter, feedbackFilter, search])

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / PAGE_SIZE)
  )

  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  )

  const totalDeteksi = history.length

  const totalBenar = history.filter(
    (r) => r.feedback === 'benar'
  ).length

  const totalSalah = history.filter(
    (r) => r.feedback === 'salah'
  ).length

  return (
    <div className="min-h-screen bg-bg font-sans">
      <Navbar
        showLinks
        activePage="riwayat"
        userName={
          user?.nama_lengkap ??
          user?.email ??
          'Pengguna'
        }
      />

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
          <StatCard
            label="Total deteksi"
            value={totalDeteksi}
            color="blue"
          />

          <StatCard
            label="Prediksi benar"
            value={totalBenar}
            color="green"
          />

          <StatCard
            label="Prediksi salah"
            value={totalSalah}
            color="red"
          />
        </div>

        <FilterBar
          emotionFilter={emotionFilter}
          onEmotionChange={(v) => {
            setEmotionFilter(v)
            setPage(1)
          }}
          feedbackFilter={feedbackFilter}
          onFeedbackChange={(v) => {
            setFeedbackFilter(v)
            setPage(1)
          }}
          search={search}
          onSearchChange={(v) => {
            setSearch(v)
            setPage(1)
          }}
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