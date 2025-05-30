import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function PrivateRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
                <div className="text-[var(--color-text)]">Carregando...</div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return <>{children}</>
} 