import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import AuthCard from '../components/auth/AuthCard'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: ganti dengan POST /auth/login pas BE udah jalan
    console.log('login attempt', { username, password })
  }

  const handleSkipLogin = () => {
    login('dummy-token-for-dev', {
      id_user: 0,
      username: 'testuser',
      nama_lengkap: 'Pengguna Uji',
    })
    navigate('/')
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans">
      <Navbar />

      <AuthCard
        title="Masuk ke akun"
        subtitle="Sistem deteksi emosi teks tweet bahasa Indonesia"
        footerText="Belum punya akun?"
        footerLinkText="Daftar sekarang"
        footerTo="/register"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Username
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="username"
                type="text"
                placeholder="Masukkan username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-[10px] bg-brand-blue text-sm font-medium text-white transition-colors hover:bg-[#1648c8]"
          >
            Masuk
          </button>

          {import.meta.env.DEV && (
            <button
              type="button"
              onClick={handleSkipLogin}
              className="mt-3 w-full rounded-lg border border-dashed border-text-muted py-2 text-xs text-text-muted transition-colors hover:border-brand-blue hover:text-brand-blue"
            >
              ⚡ Skip login (dev only)
            </button>
          )}
        </form>
      </AuthCard>
    </div>
  )
}