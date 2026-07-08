import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"

import Navbar from "../components/layout/Navbar"
import AuthCard from "../components/auth/AuthCard"
import { useAuth } from "../context/AuthContext"
import api from "../services/api"

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    setErrorMsg("")
    setLoading(true)

    try {
      const formData = new URLSearchParams()

      // OAuth2PasswordRequestForm selalu menggunakan field "username"
      formData.append("username", email)
      formData.append("password", password)

      const response = await api.post(
        "/auth/login",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )

      const token = response.data.access_token

      // simpan token sementara
      localStorage.setItem("token", token)

      // ambil data user yang sedang login
      const me = await api.get("/users/me")

      // simpan ke AuthContext
      login(token, me.data)

      navigate("/")
    } catch (error) {
      console.error(error)

      if (error.response) {
        setErrorMsg(error.response.data.detail)
      } else {
        setErrorMsg("Tidak dapat terhubung ke server.")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSkipLogin = () => {
    login("dummy-token", {
      id: 0,
      username: "developer",
      email: "developer@example.com",
    })

    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg font-sans">
      <Navbar />

      <AuthCard
        title="Masuk ke akun"
        subtitle="Sistem Deteksi Emosi Teks Tweet Bahasa Indonesia"
        footerText="Belum punya akun?"
        footerLinkText="Daftar sekarang"
        footerTo="/register"
      >
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-1.5 block text-[13px] font-medium text-text-primary"
            >
              Email
            </label>

            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                id="email"
                type="email"
                placeholder="Masukkan email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="mb-1.5 block text-[13px] font-medium text-text-primary"
            >
              Password
            </label>

            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />

              <input
                id="password"
                type="password"
                placeholder="Masukkan password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-10.5 w-full rounded-[10px] border border-border pl-9.5 pr-3 text-sm text-text-primary outline-none transition-colors focus:border-brand-blue"
                required
              />
            </div>
          </div>

          {errorMsg && (
            <div className="mb-4 rounded-[10px] border border-[#F8B4B4] bg-[#FDF2F2] px-3.5 py-2.5 text-[13px] text-[#9B1C1C]">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 h-11 w-full rounded-[10px] bg-brand-blue text-sm font-medium text-white transition-colors hover:bg-[#1648c8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Masuk..." : "Masuk"}
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