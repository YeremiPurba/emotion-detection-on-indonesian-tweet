import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './routes/ProtectedRoute'

import Login from './pages/Login'
import Register from './pages/Register'
import Beranda from './pages/Beranda'
import Riwayat from './pages/Riwayat'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/beranda"
          element={
            <ProtectedRoute>
              <Beranda />
            </ProtectedRoute>
          }
        />
        <Route
          path="/riwayat"
          element={
            <ProtectedRoute>
              <Riwayat />
            </ProtectedRoute>
          }
        />

        <Route path="/" element={<Navigate to="/beranda" replace />} />
        <Route path="*" element={<Navigate to="/beranda" replace />} />
      </Routes>
    </AuthProvider>
  )
}