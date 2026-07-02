import { Link, useNavigate } from 'react-router-dom'
import { Smile, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

export default function Navbar({ showLinks = false, activePage = '', userName = '' }) {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const initials = userName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="flex h-14 items-center justify-between border-b border-border bg-white px-10">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-blue">
          <Smile size={18} strokeWidth={2} className="text-white" />
        </div>
        <span className="text-[15px] font-semibold tracking-tight text-text-primary">
          Deteksi Emosi
        </span>
      </div>

      {showLinks && (
        <div className="flex items-center gap-6">
          <Link
            to="/beranda"
            className={`pb-0.5 text-sm transition-colors ${
              activePage === 'beranda'
                ? 'border-b-2 border-brand-blue font-medium text-brand-blue'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Beranda
          </Link>
          <Link
            to="/riwayat"
            className={`pb-0.5 text-sm transition-colors ${
              activePage === 'riwayat'
                ? 'border-b-2 border-brand-blue font-medium text-brand-blue'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Riwayat
          </Link>
        </div>
      )}

      {showLinks && userName && (
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg py-1.25 pl-2 pr-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-blue-light text-[11px] font-semibold text-brand-blue">
              {initials}
            </div>
            <span className="text-[13px] font-medium text-text-primary">{userName}</span>
          </div>

          <button
            onClick={handleLogout}
            title="Keluar"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-[#E02424] hover:text-[#E02424]"
          >
            <LogOut size={15} />
          </button>
        </div>
      )}
    </nav>
  )
}