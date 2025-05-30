import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from '../components/Auth'

export default function Login() {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        
        const result = await Auth.signUp(email, password)
        console.log(result.message)
        setLoading(false)
    }

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        
        const result = await Auth.signIn(email, password)
        if (result.success) {
            navigate('/')
        } else {
            console.log(result.message)
        }
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center">
            <div className="w-full max-w-md mx-auto">
                <div className="bg-[var(--color-background-dark)] p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-bold text-[var(--color-text)] mb-6 text-center">
                        Autenticação
                    </h2>
                    
                    {message && (
                        <div className="mb-4 p-3 rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-text)] text-center">
                            {message}
                        </div>
                    )}

                    <form className="space-y-4">
                        <div>
                            <label className="block text-[var(--color-text-light)] mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 rounded-lg bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)]/10"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-[var(--color-text-light)] mb-2" htmlFor="password">
                                Senha
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 rounded-lg bg-[var(--color-background)] text-[var(--color-text)] border border-[var(--color-primary)]/10"
                                required
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={handleSignIn}
                                disabled={loading}
                                className="flex-1 bg-[var(--color-primary)] text-white p-2 rounded-lg hover:bg-[var(--color-primary-dark)] transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Carregando...' : 'Entrar'}
                            </button>
                            <button
                                onClick={handleSignUp}
                                disabled={loading}
                                className="flex-1 bg-[var(--color-secondary)] text-white p-2 rounded-lg hover:bg-[var(--color-secondary-dark)] transition-colors disabled:opacity-50"
                            >
                                {loading ? 'Carregando...' : 'Cadastrar'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
