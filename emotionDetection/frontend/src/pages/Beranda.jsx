import { useState } from 'react'
import { RotateCcw } from 'lucide-react'

import Navbar from '../components/layout/Navbar'
import StepTracker from '../components/beranda/StepTracker'
import TweetInputForm from '../components/beranda/TweetInputForm'
import PredictionResult from '../components/beranda/PredictionResult'
import FeedbackForm from '../components/beranda/FeedbackForm'

import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Beranda() {
  const { user } = useAuth()

  const [teks, setTeks] = useState('')
  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState(null)

  const [feedbackChoice, setFeedbackChoice] = useState(null)
  const [koreksiLabel, setKoreksiLabel] = useState(null)
  const [saved, setSaved] = useState(false)

  const handleDeteksi = async () => {
    if (!teks.trim()) {
      alert('Masukkan teks terlebih dahulu.')
      return
    }

    setLoading(true)

    try {
      const response = await api.post('/predict', {
        text: teks,
      })

      const data = response.data

      setResult({
        historyId: data.history_id,
        label: data.emotion,
        score: Number(data.confidence*100).toFixed(2),
        tweetText: teks,
      })

      setFeedbackChoice(null)
      setKoreksiLabel(null)
      setSaved(false)
    } catch (error) {
      console.error(error)

      if (error.response) {
        alert(error.response.data.detail)
      } else {
        alert('Gagal menghubungi server')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleChooseFeedback = (choice) => {
    setFeedbackChoice(choice)

    if (choice === 'benar') {
      setKoreksiLabel(null)
    }
  }

  const handleSaveFeedback = async () => {
    if (!feedbackChoice) {
      alert('Pilih feedback terlebih dahulu.')
      return
    }

    if (feedbackChoice === 'salah' && !koreksiLabel) {
      alert('Pilih label yang benar terlebih dahulu.')
      return
    }

    try {
      await api.post('/feedback', {
        history_id: result.historyId,
        feedback: feedbackChoice,
        correction:
          feedbackChoice === 'salah'
            ? koreksiLabel.toLowerCase()
            : null,
      })

      setSaved(true)
      alert('Feedback berhasil disimpan.')
    } catch (error) {
      console.error(error)

      if (error.response) {
        alert(error.response.data.detail)
      } else {
        alert('Gagal menyimpan feedback.')
      }
    }
  }

  const handleReset = () => {
    setTeks('')
    setResult(null)
    setFeedbackChoice(null)
    setKoreksiLabel(null)
    setSaved(false)
  }

  const currentStep =
    !result ? 1 : saved ? 4 : feedbackChoice ? 3 : 2

  return (
    <div className="min-h-screen bg-bg font-sans">
      <Navbar
        showLinks
        activePage="beranda"
        userName={user?.nama_lengkap ?? user?.email ?? 'Pengguna'}
      />

      <div className="mx-auto max-w-180 px-6 pb-16 pt-8">
        <h1 className="mb-1 font-serif-display text-[28px] tracking-tight text-text-primary">
          Deteksi Emosi Teks
        </h1>

        <p className="mb-7 text-sm text-text-secondary">
          Masukkan teks tweet berbahasa Indonesia untuk mendeteksi emosinya
        </p>

        <StepTracker current={currentStep} />

        {!result ? (
          <TweetInputForm
            value={teks}
            onChange={setTeks}
            onSubmit={handleDeteksi}
            loading={loading}
          />
        ) : (
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-white p-4">
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 text-xs text-text-muted">
                Teks yang dianalisis
              </div>

              <div className="truncate text-[13.5px] text-text-primary">
                {result.tweetText}
              </div>
            </div>

            <button
              onClick={handleReset}
              className="ml-4 flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] border border-border px-3.5 text-[13px] font-medium text-text-secondary transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              <RotateCcw size={14} />
              Deteksi ulang
            </button>
          </div>
        )}

        {result && (
          <>
            <PredictionResult
              label={result.label}
              score={result.score}
              tweetText={result.tweetText}
            />

            <FeedbackForm
              detectedLabel={result.label}
              feedbackChoice={feedbackChoice}
              onChooseFeedback={handleChooseFeedback}
              koreksiLabel={koreksiLabel}
              onChooseKoreksi={setKoreksiLabel}
              onSave={handleSaveFeedback}
              saved={saved}
            />
          </>
        )}
      </div>
    </div>
  )
}