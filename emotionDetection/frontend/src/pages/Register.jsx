import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Lock, UserCircle } from 'lucide-react'
import Navbar from '../components/layout/Navbar'
import AuthCard from '../components/auth/AuthCard'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [nama, setNama] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [konfirmasi, setKonfirmasi] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setErrorMsg('')

    if (!nama.trim() || !username.trim() || !password || !konfirmasi) {
      setErrorMsg('Semua field wajib diisi.')
      return
    }
    if (password !== konfirmasi) {
      setErrorMsg('Konfirmasi password tidak sama dengan password.')
      return
    }

    // TODO: ganti dengan axios.post('/auth/register', { nama_lengkap: nama, username, password })
    // lalu, kalau BE langsung balikin token setelah register:
    // login(response.token, response.user)
    console.log('register attempt', { nama, username, password })
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans">
      <Navbar />

      <AuthCard
        title="Buat akun baru"
        subtitle="Isi data diri kamu untuk mendaftar"
        footerText="Sudah punya akun?"
        footerLinkText="Masuk di sini"
        footerTo="/login"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label htmlFor="nama" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Nama lengkap
            </label>
            <div className="relative">
              <UserCircle size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="nama"
                type="text"
                placeholder="Masukkan nama lengkap"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="mb-3.5">
            <label htmlFor="username" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Username
            </label>
            <div className="relative">
              <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="username"
                type="text"
                placeholder="Buat username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="mb-3.5">
            <label htmlFor="password" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="password"
                type="password"
                placeholder="Buat password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          <div className="mb-3.5">
            <label htmlFor="konfirmasi" className="mb-1.5 block text-[13px] font-medium text-text-primary">
              Konfirmasi password
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                id="konfirmasi"
                type="password"
                placeholder="Ulangi password"
                value={konfirmasi}
                onChange={(e) => setKonfirmasi(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-3.5 rounded-[10px] border border-[#F8B4B4] bg-[#FDF2F2] px-3.5 py-2.5 text-[13px] text-[#9B1C1C]">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="mt-2 h-11 w-full rounded-[10px] bg-brand-blue text-sm font-medium text-white transition-colors hover:bg-[#1648c8]"
          >
            Daftar
          </button>
        </form>
      </AuthCard>
    </div>
  )
}